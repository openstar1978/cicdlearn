import { useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import api from 'api/client';

const getPermissionGroup = (permissionName) => permissionName?.split('.')[0] || 'Other';

export default function UserPermissionDialog({ open, handleClose, user, showMessage }) {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const groupedPermissions = useMemo(
    () =>
      permissions.reduce((groups, permission) => {
        const group = getPermissionGroup(permission.name);
        return { ...groups, [group]: [...(groups[group] || []), permission] };
      }, {}),
    [permissions]
  );

  useEffect(() => {
    if (!open || !user?.id) return;

    const loadPermissions = async () => {
      setLoading(true);
      try {
        const [allPermissionsRes, userPermissionsRes] = await Promise.all([
          api.get('/permissions'),
          api.get(`/permissions/users/${user.id}`)
        ]);
        setPermissions(allPermissionsRes.data || []);
        setSelectedPermissionIds((userPermissionsRes.data || []).map((permission) => permission.id));
      } catch (error) {
        showMessage(error.response?.data?.message || 'Failed to load permissions', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadPermissions();
  }, [open, user, showMessage]);

  const handleToggle = (permissionId) => {
    setSelectedPermissionIds((currentIds) =>
      currentIds.includes(permissionId) ? currentIds.filter((id) => id !== permissionId) : [...currentIds, permissionId]
    );
  };

  const handleSelectGroup = (groupPermissions) => {
    const groupIds = groupPermissions.map((permission) => permission.id);
    const hasAllGroupPermissions = groupIds.every((id) => selectedPermissionIds.includes(id));
    setSelectedPermissionIds((currentIds) =>
      hasAllGroupPermissions ? currentIds.filter((id) => !groupIds.includes(id)) : Array.from(new Set([...currentIds, ...groupIds]))
    );
  };

  const handleSave = async () => {
    if (!user?.id) return;

    setSaving(true);
    try {
      await api.put(`/permissions/users/${user.id}`, { permissionIds: selectedPermissionIds });
      showMessage('Permissions updated successfully');
      handleClose();
    } catch (error) {
      showMessage(error.response?.data?.message || 'Failed to update permissions', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Assign Permissions</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {user?.username || user?.email || 'Selected user'}
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={2}>
            {Object.entries(groupedPermissions).map(([group, groupPermissions]) => {
              const groupIds = groupPermissions.map((permission) => permission.id);
              const checkedCount = groupIds.filter((id) => selectedPermissionIds.includes(id)).length;

              return (
                <Box key={group}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedCount === groupIds.length}
                        indeterminate={checkedCount > 0 && checkedCount < groupIds.length}
                        onChange={() => handleSelectGroup(groupPermissions)}
                      />
                    }
                    label={<Typography variant="subtitle1">{group}</Typography>}
                  />
                  <Box display="grid" gap={1} pl={4}>
                    {groupPermissions.map((permission) => (
                      <FormControlLabel
                        key={permission.id}
                        control={
                          <Checkbox checked={selectedPermissionIds.includes(permission.id)} onChange={() => handleToggle(permission.id)} />
                        }
                        label={permission.name}
                      />
                    ))}
                  </Box>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              );
            })}
            {!permissions.length && <Typography color="text.secondary">No permissions found.</Typography>}
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={saving}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} disabled={loading || saving}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

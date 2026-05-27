import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import api from 'api/client';

const emptyForm = {
  username: '',
  email: '',
  pword: '',
  roleId: '',
  realName: '',
  signature: '',
  position: '',
  department: '',
  inactive: false
};

export default function UserDialog({ open, handleClose, user, onSuccess, showMessage }) {
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;

    api
      .get('/roles')
      .then((response) => setRoles(response.data || []))
      .catch(() => setRoles([]));
  }, [open]);

  useEffect(() => {
    if (user) {
      setForm({
        ...emptyForm,
        username: user.username || '',
        email: user.email || '',
        roleId: user.roleId || '',
        realName: user.realName || '',
        signature: user.signature || '',
        position: user.position || '',
        department: user.department || '',
        inactive: !!user.inactive
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [user, open]);

  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const validate = () => {
    const nextErrors = {};
    if (!form.username.trim()) nextErrors.username = 'Username is required';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Invalid email format';
    if (!form.roleId) nextErrors.roleId = 'Role is required';
    if (!user && !form.pword.trim()) nextErrors.pword = 'Password is required';
    else if (!user && form.pword.length < 6) nextErrors.pword = 'Password must be at least 6 characters';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (user) await api.put('/users', { id: user.id, ...form });
      else await api.post('/users', form);

      showMessage(user ? 'User updated successfully' : 'User created successfully');
      onSuccess();
      handleClose();
    } catch (error) {
      showMessage(error.response?.data?.message || 'Something went wrong', 'error');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ pt: 0.5 }}>
          <TextField
            label="Username"
            value={form.username}
            onChange={(event) => setField('username', event.target.value)}
            error={!!errors.username}
            helperText={errors.username}
            fullWidth
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={(event) => setField('email', event.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
          <TextField
            select
            label="Role"
            value={form.roleId}
            onChange={(event) => setField('roleId', event.target.value)}
            error={!!errors.roleId}
            helperText={errors.roleId}
            fullWidth
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.description}
              </MenuItem>
            ))}
          </TextField>
          <TextField label="Real Name" value={form.realName} onChange={(event) => setField('realName', event.target.value)} fullWidth />
          <TextField label="Position" value={form.position} onChange={(event) => setField('position', event.target.value)} fullWidth />
          <TextField
            label="Department"
            value={form.department}
            onChange={(event) => setField('department', event.target.value)}
            fullWidth
          />
          <TextField label="Signature" value={form.signature} onChange={(event) => setField('signature', event.target.value)} fullWidth />
          {!user && (
            <TextField
              type="password"
              label="Password"
              value={form.pword}
              onChange={(event) => setField('pword', event.target.value)}
              error={!!errors.pword}
              helperText={errors.pword}
              fullWidth
            />
          )}
          <FormControlLabel
            control={<Switch checked={form.inactive} onChange={(event) => setField('inactive', event.target.checked)} />}
            label="Inactive"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

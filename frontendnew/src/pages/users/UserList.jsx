import { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import SafetyCertificateOutlined from '@ant-design/icons/SafetyCertificateOutlined';

import api from 'api/client';
import AppSnackbar from 'components/AppSnackbar';
import DataTablePagination from 'components/DataTablePagination';
import MainCard from 'components/MainCard';
import { useDataGrid } from 'hooks/useDataGrid';
import { hasPermission } from 'utils/auth';
import UserDialog from './UserDialog';
import UserPermissionDialog from './UserPermissionDialog';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [permissionOpen, setPermissionOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const { page, setPage, pageSize, setPageSize, sortModel, setSortModel, getRequest } = useDataGrid();
  const canCreateUser = hasPermission('Users.Create');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showMessage = useCallback((message, severity = 'success') => setSnackbar({ open: true, message, severity }), []);

  const loadUsers = useCallback(async () => {
    try {
      const response = await api.get('/users', { params: getRequest() });
      setUsers(response.data?.data || []);
      setRowCount(response.data?.total || 0);
    } catch (error) {
      showMessage(error.response?.data?.message || 'Unable to load users', 'error');
      setUsers([]);
      setRowCount(0);
    }
  }, [getRequest, showMessage]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers, page, pageSize, sortModel]);

  const handleAdd = () => {
    setSelectedUser(null);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      showMessage('User deleted successfully');
      loadUsers();
    } catch (error) {
      showMessage(error.response?.data?.message || 'Failed to delete user', 'error');
    }
  };

  return (
    <MainCard
      title="Users"
      secondary={
        canCreateUser && (
          <Button variant="contained" onClick={handleAdd}>
            Add User
          </Button>
        )
      }
      contentSX={{ p: 0 }}
    >
      <TableContainer>
        <Table size="small" sx={{ minWidth: 860 }}>
          <TableHead>
            <TableRow>
              {[
                { label: 'Username', field: 'username' },
                { label: 'Email', field: 'email' },
                { label: 'Department', field: 'department' },
                { label: 'Status', field: 'inactive' }
              ].map((column) => (
                <TableCell
                  key={column.field}
                  onClick={() =>
                    setSortModel((current) => [
                      { field: column.field, sort: current[0]?.field === column.field && current[0]?.sort === 'asc' ? 'desc' : 'asc' }
                    ])
                  }
                  sx={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={user.inactive ? 'Inactive' : 'Active'}
                    color={user.inactive ? 'default' : 'success'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" gap={0.5} justifyContent="flex-end">
                    <Tooltip title="Edit user">
                      <IconButton
                        onClick={() => {
                          setSelectedUser(user);
                          setOpen(true);
                        }}
                      >
                        <EditOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete user">
                      <IconButton color="error" onClick={() => handleDelete(user.id)}>
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Assign permissions">
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<SafetyCertificateOutlined />}
                        onClick={() => {
                          setSelectedUser(user);
                          setPermissionOpen(true);
                        }}
                      >
                        Permission
                      </Button>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {!users.length && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No users found.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <DataTablePagination
        page={page}
        pageSize={pageSize}
        rowCount={rowCount}
        pageSizeOptions={[5, 10, 20]}
        onPageChange={setPage}
        onPageSizeChange={(nextPageSize) => {
          setPage(0);
          setPageSize(nextPageSize);
        }}
      />
      <UserDialog open={open} handleClose={() => setOpen(false)} user={selectedUser} onSuccess={loadUsers} showMessage={showMessage} />
      <UserPermissionDialog
        open={permissionOpen}
        handleClose={() => setPermissionOpen(false)}
        user={selectedUser}
        showMessage={showMessage}
      />
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((current) => ({ ...current, open: false }))}
      />
    </MainCard>
  );
}

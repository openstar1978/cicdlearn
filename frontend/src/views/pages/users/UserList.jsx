import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { alpha, ThemeProvider, createTheme } from '@mui/material/styles'
import UserDialog from './UserDialog'
import UserPermissionDialog from './UserPermissionDialog'
import AppSnackbar from '../../../components/AppSnackbar'
import { DataGrid } from '@mui/x-data-grid'
import { useDataGrid } from '../../../hooks/useDataGrid'
import { hasPermission } from '../../utils/auth'
import { adminColors } from '../../../theme'
const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: adminColors.darkBlue,
      },
      secondary: {
        main: adminColors.brightBlue,
      },
      DataGrid: {
        bg: mode === 'light' ? '#ffffff' : '#1f2937',
        pinnedBg: mode === 'light' ? '#f1f5f9' : '#1e293b',
        headerBg: adminColors.darkBlue,
      },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            borderColor: adminColors.border,
            borderRadius: '8px',
            overflow: 'hidden',
          },
          columnHeaders: {
            backgroundColor: adminColors.darkBlue,
            color: '#ffffff',
            borderBottom: `2px solid ${adminColors.brightBlue}`,
          },
          columnHeaderTitle: {
            fontWeight: 700,
          },
          row: {
            '&:hover': {
              backgroundColor: alpha(adminColors.brightBlue, 0.08),
            },
          },
          footerContainer: {
            backgroundColor: '#ffffff',
            color: adminColors.text,
          },
          toolbarContainer: {
            color: adminColors.text,
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            color: adminColors.text,
          },
          selectIcon: {
            color: adminColors.text,
          },
          actions: {
            color: adminColors.text,
          },
        },
      },
    },
  })
function UserList() {
  const [mode, setMode] = React.useState('dark')
  const theme = React.useMemo(() => getTheme(mode), [mode])
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false)
  const [permissionOpen, setPermissionOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [rowCount, setRowCount] = useState(0)
  const canCreateUser = hasPermission('Users.Create')
  const { page, setPage, pageSize, setPageSize, sortModel, setSortModel, getRequest } =
    useDataGrid()

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const columns = [
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 },
    {
      field: 'inactive',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (params.value ? 'Inactive' : 'Active'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      minWidth: 260,
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title="Edit user">
            <IconButton aria-label="Edit user" onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete user">
            <IconButton aria-label="Delete user" onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Assign permissions">
            <Button
              aria-label="Assign permissions"
              size="small"
              variant="contained"
              color="secondary"
              startIcon={<AdminPanelSettingsIcon />}
              onClick={() => handlePermissions(params.row)}
              sx={{
                color: '#ffffff',
                minWidth: 118,
                '& .MuiButton-startIcon': {
                  color: '#ffffff',
                },
              }}
            >
              Permission
            </Button>
          </Tooltip>
        </Box>
      ),
    },
  ]

  const loadUsers = async () => {
    const sortField = sortModel[0]?.field || 'Id'
    const sortOrder = sortModel[0]?.sort || 'asc'

    const res = await api.get('/users', {
      params: getRequest(),
    })

    setUsers(res.data.data)
    setRowCount(res.data.total)
  }

  useEffect(() => {
    loadUsers()
  }, [page, pageSize, sortModel])
  const showMessage = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }
  const handleAdd = () => {
    setSelectedUser(null)
    setOpen(true)
  }

  const handleEdit = (user) => {
    setSelectedUser(user)
    setOpen(true)
  }

  const handlePermissions = (user) => {
    setSelectedUser(user)
    setPermissionOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`)
      showMessage('User deleted successfully')
      loadUsers()
    } catch (err) {
      showMessage('Failed to delete user', 'error')
    }
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>

      {canCreateUser && (
        <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>
          Add User
        </Button>
      )}
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={users}
          columns={columns}
          rowCount={rowCount}
          pagination
          paginationMode="server"
          sortingMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page)
            setPageSize(model.pageSize)
          }}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          pageSizeOptions={[5, 10, 20]}
          autoHeight
        />
      </ThemeProvider>
      {/* <Paper>
        <Table>
          <TableHead>
  <TableRow>
    <TableCell>Username</TableCell>
    <TableCell>Email</TableCell>
    <TableCell>Role</TableCell>
    <TableCell>Department</TableCell>
    <TableCell>Status</TableCell>
    <TableCell>Actions</TableCell>
  </TableRow>
</TableHead>

<TableBody>
  {users.map((u) => (
    <TableRow key={u.id}>
      <TableCell>{u.username}</TableCell>
      <TableCell>{u.email}</TableCell>
      <TableCell>{u.roleId}</TableCell>
      <TableCell>{u.department}</TableCell>
      <TableCell>{u.inactive ? "Inactive" : "Active"}</TableCell>

      <TableCell>
        <IconButton onClick={() => handleEdit(u)}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => handleDelete(u.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
      </Paper> */}

      <UserDialog
        open={open}
        handleClose={() => setOpen(false)}
        user={selectedUser}
        onSuccess={loadUsers}
        showMessage={showMessage}
      />
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
        onClose={handleSnackbarClose}
      />
    </Box>
  )
}

export default UserList

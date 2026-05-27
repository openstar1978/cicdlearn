/**
 * Merged replacement for legacy `cust_header.asp` + `new_main_form.asp` (customer list).
 * — Sticky header + A–Z range (cust_header)
 * — Filters, list mode, paging (new_main_form customer / lease modes)
 * Wire to your API when ready (see filter pipeline in useMemo).
 */

import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Stack,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { alpha, ThemeProvider, createTheme } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'

import { buildCustomerFormSearch } from './customerFormPaths'
import { adminColors } from '../../theme'
import api from '../../views/api/axios'
import DataTablePagination from '../../components/DataTablePagination'

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
        bg: '#ffffff',
        pinnedBg: '#f9fafb',
        headerBg: adminColors.headerBg,
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
            backgroundColor: adminColors.headerBg,
            color: adminColors.text,
            borderBottom: `2px solid ${adminColors.border}`,
          },
          columnHeaderTitle: {
            fontWeight: 700,
          },
          row: {
            color: adminColors.text,
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
export default function CustomerPage() {
  const navigate = useNavigate()
  const [mode] = React.useState('light')
  const theme = React.useMemo(() => getTheme(mode), [mode])
  const [sortMode, setSortMode] = useState('custref')
  const [displayMode, setDisplayMode] = useState('First50')
  const [searchText, setSearchText] = useState('')
  const [rows, setRows] = useState([])
  const [rowCount, setRowCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 })

  const customerColumns = [
    {
      field: 'accountRef',
      headerName: 'ACC REF',
      minWidth: 110,
      flex: 0.6,
      renderCell: (p) => (
        <Typography
          component="button"
          variant="body2"
          onClick={(e) => {
            e.stopPropagation()
            navigate(buildCustomerFormSearch(p.value))
          }}
          sx={{
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            p: 0,
            color: 'primary.main',
            textDecoration: 'underline',
            font: 'inherit',
          }}
        >
          {p.value}
        </Typography>
      ),
    },
    { field: 'name', headerName: 'CUSTOMER', flex: 1.4, minWidth: 180 },
    { field: 'town', headerName: 'TOWN', flex: 0.8, minWidth: 100 },
    { field: 'county', headerName: 'COUNTY', flex: 0.8, minWidth: 100 },
    { field: 'postcode', headerName: 'POST CODE', flex: 0.7, minWidth: 100 },
    {
      field: 'phoneDisplay',
      headerName: 'PHONE NUMBER',
      flex: 1.2,
      minWidth: 160,
      valueGetter: (_v, row) => {
        const c = row.contact ? `${row.contact} — ` : ''
        return `${c}${row.phone ?? ''}`
      },
    },
  ]

  const leaseColumns = [
    {
      field: 'accountRef',
      headerName: 'ACC REF',
      minWidth: 100,
      renderCell: (p) => (
        <Typography
          component="button"
          variant="body2"
          onClick={(e) => {
            e.stopPropagation()
            navigate(buildCustomerFormSearch(p.value))
          }}
          sx={{
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            p: 0,
            color: 'primary.main',
            textDecoration: 'underline',
            font: 'inherit',
          }}
        >
          {p.value}
        </Typography>
      ),
    },
    { field: 'name', headerName: 'CUSTOMER', flex: 1, minWidth: 160 },
    { field: 'postcode', headerName: 'POST CODE', minWidth: 100 },
    {
      field: 'phoneDisplay',
      headerName: 'CONTACT / PHONE',
      flex: 1,
      minWidth: 160,
      valueGetter: (_v, row) => {
        const c = row.contact ? `${row.contact} — ` : ''
        return `${c}${row.phone ?? ''}`
      },
    },
    { field: 'leaseId', headerName: 'LEASE ID', type: 'number', minWidth: 90 },
    { field: 'leaseDesc', headerName: 'DESCRIPTION', flex: 1, minWidth: 140 },
    { field: 'startDate', headerName: 'START', minWidth: 110 },
    { field: 'endDate', headerName: 'END', minWidth: 110 },
    { field: 'paymentAmount', headerName: 'PMT', type: 'number', minWidth: 80 },
    {
      field: 'leaseStatus',
      headerName: 'STATUS',
      minWidth: 120,
      valueGetter: (_v, row) => `${row.termination} — ${row.leaseStatus}`,
    },
  ]

  const loadRows = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const endpoint = sortMode === 'leaseid' ? '/customers/by-lease' : '/customers/by-school'
      const response = await api.get(endpoint, {
        params: {
          search: searchText,
          page: paginationModel.page + 1,
          pageSize: paginationModel.pageSize,
        },
      })
      setRows(response.data?.data ?? [])
      setRowCount(response.data?.total ?? 0)
    } catch (err) {
      if (err?.response?.status === 403) {
        setError(
          sortMode === 'leaseid'
            ? 'You do not have Leases.View permission.'
            : 'You do not have Schools.View permission.',
        )
      } else {
        setError('Unable to load customer data.')
      }
      setRows([])
      setRowCount(0)
    } finally {
      setLoading(false)
    }
  }, [paginationModel.page, paginationModel.pageSize, searchText, sortMode])

  useEffect(() => {
    const timeout = window.setTimeout(loadRows, 300)
    return () => window.clearTimeout(timeout)
  }, [loadRows])

  useEffect(() => {
    const pageCount = Math.max(1, Math.ceil(rowCount / paginationModel.pageSize))

    if (paginationModel.page >= pageCount) {
      setPaginationModel((current) => ({ ...current, page: pageCount - 1 }))
    }
  }, [paginationModel.page, paginationModel.pageSize, rowCount])

  const handleRowClick = useCallback(
    (params) => {
      const ref = params.row.accountRef
      if (ref) navigate(buildCustomerFormSearch(ref))
    },
    [navigate],
  )

  return (
    <Box sx={{ width: '100%', pb: 2 }}>
      <ThemeProvider theme={theme}>
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 600, textAlign: 'center', color: theme.palette.primary.main }}
        >
          Schools
        </Typography>
        {/* <Box
            sx={(theme) => ({
              px: 2,
              py: 1.5,
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: alpha(theme.palette.primary.light, 0.06),
            })}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                Filter by school name (first letter)
              </Typography>
              <ToggleButtonGroup
                exclusive
                size="small"
                color="primary"
                value={letterFilter}
                onChange={onLetterChange}
                sx={{ flexWrap: 'wrap', gap: 0.5 }}
              >
                {ALPHABET.map((L) => (
                  <ToggleButton
                    key={L}
                    value={L}
                    sx={{ px: 0.75, minWidth: 0, fontSize: '0.75rem' }}
                  >
                    {L}
                  </ToggleButton>
                ))}
                <ToggleButton value="ALL" sx={{ px: 1.25, fontSize: '0.8rem' }}>
                  All
                </ToggleButton>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={() => {
                    setLetterFilter('ALL')
                    setAccountRef1('')
                    setCustomerName('')
                    setTown('')
                    setCounty('')
                    setPostcode('')
                    setListItem('name')
                    setDisplayMode('First50')
                    setSortMode('custref')
                  }}
                >
                  Reset
                </Button>
              </ToggleButtonGroup>
            </Stack>
          </Box> */}

        <Box sx={{ bgcolor: 'white', color: 'black', p: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: '100%', mb: 1 }}
          >
            {/* Left Side */}
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                View : &nbsp;
              </Typography>

              <ToggleButtonGroup
                exclusive
                size="small"
                color="primary"
                value={sortMode}
                onChange={(_e, v) => {
                  if (v) {
                    setSortMode(v)
                    setPaginationModel((current) => ({ ...current, page: 0 }))
                  }
                }}
              >
                <ToggleButton value="custref">By school</ToggleButton>
                <ToggleButton value="leaseid">By lease</ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <Stack direction="row" alignItems="center" gap={1}>
              <TextField
                label={sortMode === 'leaseid' ? 'Search lease' : 'Search school'}
                size="small"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value)
                  setPaginationModel((current) => ({ ...current, page: 0 }))
                }}
                sx={{ width: 280 }}
              />
              <Button size="small" variant="outlined" onClick={loadRows}>
                Search
              </Button>
              <Button
                size="small"
                variant="text"
                onClick={() => {
                  setSearchText('')
                  setDisplayMode('First50')
                  setPaginationModel((current) => ({ ...current, page: 0 }))
                }}
              >
                Reset
              </Button>
            </Stack>
          </Stack>

          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          {/* <Stack direction="row" flexWrap="wrap" gap={1} useFlexGap>
            <TextField
              label="Account ref"
              size="small"
              value={accountRef1}
              onChange={(e) => setAccountRef1(e.target.value)}
              sx={{ width: 140 }}
            />
            <TextField
              label="Customer name"
              size="small"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              sx={{ minWidth: 200, flex: '1 1 200px' }}
            />
            {sortMode === 'custref' && (
              <>
                <TextField
                  label="Town"
                  size="small"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  sx={{ width: 140 }}
                />
                <TextField
                  label="County"
                  size="small"
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  sx={{ width: 140 }}
                />
              </>
            )}
            <TextField
              label="Post code"
              size="small"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              sx={{ width: 120 }}
            />
          </Stack> */}

          {/* <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            gap={1}
            sx={{ mt: 1.5 }}
          >
            <RadioGroup
              row
              value={listItem}
              onChange={(e) => setListItem(e.target.value)}
              aria-label="List filter"
            >
              <FormControlLabel
                value="name"
                control={<Radio size="small" color="primary" />}
                label={<Typography variant="body2">All</Typography>}
              />
              <FormControlLabel
                value="overdue"
                control={<Radio size="small" color="primary" />}
                label={<Typography variant="body2">Overdue</Typography>}
              />
            </RadioGroup>

            <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
              <Typography
                variant="caption"
                color={displayMode === 'FullList' ? 'primary' : 'text.secondary'}
              >
                {displayMode === 'FullList' ? 'FULL LIST' : 'FIRST 50'}
              </Typography>

              <Button
                size="small"
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => {
                  setLetterFilter('ALL')
                  setAccountRef1('')
                  setCustomerName('')
                  setTown('')
                  setCounty('')
                  setPostcode('')
                  setListItem('name')
                  setDisplayMode('First50')
                  setSortMode('custref')
                }}
              >
                Reset
              </Button>
            </Stack>
          </Stack> */}
        </Box>
        <Paper sx={{ overflow: 'hidden' }}>
          <Box sx={{ width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={sortMode === 'leaseid' ? leaseColumns : customerColumns}
              loading={loading}
              paginationMode="server"
              rowCount={rowCount}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10, 25, 50, 100]}
              onRowClick={handleRowClick}
              disableRowSelectionOnClick
              hideFooter
            />
            <DataTablePagination
              page={paginationModel.page}
              pageSize={paginationModel.pageSize}
              rowCount={rowCount}
              pageSizeOptions={[10, 25, 50, 100]}
              onPageChange={(nextPage) =>
                setPaginationModel((current) => ({ ...current, page: nextPage }))
              }
              onPageSizeChange={(nextPageSize) =>
                setPaginationModel({ page: 0, pageSize: nextPageSize })
              }
            />
          </Box>
        </Paper>
      </ThemeProvider>
    </Box>
  )
}

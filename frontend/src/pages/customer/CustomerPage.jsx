/**
 * Merged replacement for legacy `cust_header.asp` + `new_main_form.asp` (customer list).
 * — Sticky header + A–Z range (cust_header)
 * — Filters, list mode, paging (new_main_form customer / lease modes)
 * Wire to your API when ready (see filter pipeline in useMemo).
 */

import React, { useMemo, useState, useCallback } from 'react'
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
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { alpha, ThemeProvider, createTheme } from '@mui/material/styles'
import RefreshIcon from '@mui/icons-material/Refresh'
import { DataGrid } from '@mui/x-data-grid'

import { buildCustomerFormSearch } from './customerFormPaths'
import { MOCK_CUSTOMERS, MOCK_LEASE_ROWS } from './customerMockData'
import { adminColors } from '../../theme'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
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
function matchesLetter(name, letterFilter) {
  if (!name) return false
  if (letterFilter === 'ALL') return true
  const c = name.trim().charAt(0).toUpperCase()
  return c === letterFilter
}

function includesField(hay, needle) {
  if (!needle) return true
  return String(hay ?? '')
    .toLowerCase()
    .includes(String(needle).toLowerCase())
}

export default function CustomerPage() {
  const navigate = useNavigate()
  const [mode, setMode] = React.useState('dark')
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const theme = React.useMemo(() => getTheme(mode), [mode])
  const [letterFilter, setLetterFilter] = useState('ALL')
  const [sortMode, setSortMode] = useState('custref')
  const [accountRef1, setAccountRef1] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [town, setTown] = useState('')
  const [county, setCounty] = useState('')
  const [postcode, setPostcode] = useState('')
  const [listItem, setListItem] = useState('name')
  const [displayMode, setDisplayMode] = useState('First50')

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

  const filteredCustomers = useMemo(() => {
    let rows = MOCK_CUSTOMERS.filter((r) => matchesLetter(r.name, letterFilter))
    if (accountRef1) rows = rows.filter((r) => includesField(r.accountRef, accountRef1))
    if (customerName) rows = rows.filter((r) => includesField(r.name, customerName))
    if (town) rows = rows.filter((r) => includesField(r.town, town))
    if (county) rows = rows.filter((r) => includesField(r.county, county))
    if (postcode) rows = rows.filter((r) => includesField(r.postcode, postcode))
    if (listItem === 'overdue') rows = rows.filter((r) => Number(r.balance) > 0)
    rows = [...rows].sort((a, b) => String(a.name).localeCompare(String(b.name)))
    if (displayMode === 'First50') return rows.slice(0, 50)
    return rows
  }, [letterFilter, accountRef1, customerName, town, county, postcode, listItem, displayMode])

  const filteredLeases = useMemo(() => {
    let rows = [...MOCK_LEASE_ROWS]
    if (letterFilter !== 'ALL') rows = rows.filter((r) => matchesLetter(r.name, letterFilter))
    if (accountRef1) rows = rows.filter((r) => includesField(r.accountRef, accountRef1))
    if (customerName) rows = rows.filter((r) => includesField(r.name, customerName))
    if (postcode) rows = rows.filter((r) => includesField(r.postcode, postcode))
    if (listItem === 'overdue') rows = rows.filter((r) => Number(r.balance) > 0)
    if (displayMode === 'First50') return rows.slice(0, 50)
    return rows
  }, [letterFilter, accountRef1, customerName, postcode, listItem, displayMode])

  const rows = sortMode === 'leaseid' ? filteredLeases : filteredCustomers

  const onLetterChange = useCallback((_e, value) => {
    if (value != null) setLetterFilter(value)
  }, [])

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
        <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: 600, textAlign: 'center', color: theme.palette.primary.main }}
          >
            Schools
          </Typography>
          <Box
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
          </Box>

          <Box sx={{ bgcolor: 'background.paper', p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: '100%', mb: 1 }}
            >
              {/* Left Side */}
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography
                  variant="body2"
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
                  onChange={(_e, v) => v && setSortMode(v)}
                >
                  <ToggleButton value="custref">By school</ToggleButton>
                  <ToggleButton value="leaseid">By lease</ToggleButton>
                </ToggleButtonGroup>
              </Stack>

              {/* Right Side */}
              <Box sx={{ ml: 'auto' }}>
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
              </Box>
            </Stack>

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

          <Box sx={{ width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={sortMode === 'leaseid' ? leaseColumns : customerColumns}
              pageSizeOptions={[10, 25, 50, 100]}
              initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
              onRowClick={handleRowClick}
              disableRowSelectionOnClick
            />
          </Box>
        </Paper>
      </ThemeProvider>
    </Box>
  )
}

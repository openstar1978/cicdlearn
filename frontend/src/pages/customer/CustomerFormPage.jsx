/**
 * React port of legacy `cust_form.asp` (customer detail + submenu shell).
 * Expects the same query keys as the ASP link, e.g.
 * ?m_accountrefchanged=YES&txt_loadleasedatafromdb=YES&txt_accountref=ABBEYHEY
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'

import { buildCustomerFormSearch } from './customerFormPaths'
import {
  findCustomerByAccountRef,
  leasesForAccount,
  MOCK_LEGAL_STATUSES,
  MOCK_SECTORS,
} from './customerMockData'

function emptyForm(accountRef) {
  return {
    txt_accountref: accountRef,
    txt_name: '',
    txt_sectorid: '',
    txt_secsectorid: '',
    txt_notes: '',
    txt_regaddress1: '',
    txt_regaddress2: '',
    txt_regaddress3: '',
    txt_regaddress4: '',
    txt_regaddress5: '',
    txt_deladdress1: '',
    txt_deladdress2: '',
    txt_deladdress3: '',
    txt_deladdress4: '',
    txt_deladdress5: '',
    txt_invname: '',
    txt_invaddress1: '',
    txt_invaddress2: '',
    txt_invaddress3: '',
    txt_invaddress4: '',
    txt_invaddress5: '',
    chkpaper: false,
    chkemail: false,
    txt_email1: '',
    txt_website: '',
  }
}

function fromListRow(accountRef, row) {
  if (!row) return emptyForm(accountRef)
  return {
    txt_accountref: row.accountRef,
    txt_name: row.name,
    txt_sectorid: row.sectorId ?? '',
    txt_secsectorid: row.legalStatusId ?? '',
    txt_notes: row.notes ?? '',
    txt_regaddress1: '',
    txt_regaddress2: '',
    txt_regaddress3: row.town ?? '',
    txt_regaddress4: row.county ?? '',
    txt_regaddress5: row.postcode ?? '',
    txt_deladdress1: '',
    txt_deladdress2: '',
    txt_deladdress3: row.town ?? '',
    txt_deladdress4: row.county ?? '',
    txt_deladdress5: row.postcode ?? '',
    txt_invname: '',
    txt_invaddress1: '',
    txt_invaddress2: '',
    txt_invaddress3: '',
    txt_invaddress4: '',
    txt_invaddress5: '',
    chkpaper: !!row.paperInvoices,
    chkemail: !!row.emailInvoices,
    txt_email1: row.email ?? '',
    txt_website: row.website ?? '',
  }
}

export default function CustomerFormPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const txt_accountref = (searchParams.get('txt_accountref') || '').trim().toUpperCase()
  const txt_nobuttons = searchParams.get('txt_nobuttons') === 'YES'
  const loadLease = searchParams.get('txt_loadleasedatafromdb') === 'YES'

  const row = useMemo(() => findCustomerByAccountRef(txt_accountref), [txt_accountref])
  const existing = !!row
  const leaseRows = useMemo(() => leasesForAccount(txt_accountref), [txt_accountref])

  const [custSubmenu, setCustSubmenu] = useState('')
  const [isEditing, setIsEditing] = useState(!existing)
  const [form, setForm] = useState(() => fromListRow(txt_accountref, row))

  useEffect(() => {
    const r = findCustomerByAccountRef(txt_accountref)
    setForm(fromListRow(txt_accountref, r))
    setCustSubmenu('')
    setIsEditing(!r)
  }, [txt_accountref])

  const setField = useCallback((key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
  }, [])

  const legalOptions = useMemo(() => {
    const pid = form.txt_sectorid
    if (!pid) return []
    return MOCK_LEGAL_STATUSES.filter((l) => String(l.parentId) === String(pid))
  }, [form.txt_sectorid])

  const copyRegToDelivery = useCallback(() => {
    setForm((f) => ({
      ...f,
      txt_deladdress1: f.txt_regaddress1,
      txt_deladdress2: f.txt_regaddress2,
      txt_deladdress3: f.txt_regaddress3,
      txt_deladdress4: f.txt_regaddress4,
      txt_deladdress5: f.txt_regaddress5,
    }))
  }, [])

  const copyRegToInvoice = useCallback(() => {
    setForm((f) => ({
      ...f,
      txt_invname: f.txt_name,
      txt_invaddress1: f.txt_regaddress1,
      txt_invaddress2: f.txt_regaddress2,
      txt_invaddress3: f.txt_regaddress3,
      txt_invaddress4: f.txt_regaddress4,
      txt_invaddress5: f.txt_regaddress5,
    }))
  }, [])

  const onAccountRefBlur = useCallback(() => {
    const next = String(form.txt_accountref || '')
      .trim()
      .toUpperCase()
    if (!next || next === txt_accountref) return
    navigate(buildCustomerFormSearch(next))
  }, [form.txt_accountref, navigate, txt_accountref])

  const validateSave = useCallback(() => {
    if (!String(form.txt_accountref).trim()) {
      window.alert('Please enter a value for the "Account Ref." field.')
      return false
    }
    if (!String(form.txt_name).trim()) {
      window.alert('Please enter a value for the "Name" field.')
      return false
    }
    if (!String(form.txt_sectorid).trim()) {
      window.alert('Please Select the "Sector" field.')
      return false
    }
    if (!String(form.txt_secsectorid).trim()) {
      window.alert('Please Select the "Legal Status" field.')
      return false
    }
    if (!String(form.txt_regaddress1).trim()) {
      window.alert('Please Enter Street 1')
      return false
    }
    if (!String(form.txt_regaddress3).trim()) {
      window.alert('Please Enter Town')
      return false
    }
    if (!String(form.txt_regaddress5).trim()) {
      window.alert('Please Enter Post Code')
      return false
    }
    return true
  }, [form])

  const onSave = useCallback(() => {
    if (!validateSave()) return
    window.alert(
      'Save is not wired yet — replace with POST to your API (legacy: save_sagecust.asp).',
    )
  }, [validateSave])

  const navItems = [
    { key: '', label: 'Customer details' },
    { key: 'LEASE', label: 'Leases' },
    { key: 'PPOINT', label: 'Payment points' },
    { key: 'OVERDUEPP', label: 'Overdue invoices' },
  ]

  if (!txt_accountref) {
    return (
      <Box>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Missing <code>txt_accountref</code>. Open this page from the customer list (Acc Ref link).
        </Alert>
        <Button component={RouterLink} to="/customers" variant="outlined">
          Back to schools
        </Button>
      </Box>
    )
  }

  const readOnly = existing && !isEditing
  const showLeaseList = custSubmenu === 'LEASE'

  return (
    <Box sx={{ width: '100%', pb: 3 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
        flexWrap="wrap"
        gap={1}
      >
        <Typography variant="h5" fontWeight={600} color="text.primary">
          Schools
        </Typography>
        <Button component={RouterLink} to="/customers" variant="outlined" size="small">
          Back to schools
        </Button>
      </Stack>

      <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center" sx={{ mb: 2 }}>
        <Chip label={txt_accountref} color="primary" size="small" variant="filled" />
        {loadLease && <Chip label="Load lease data" size="small" variant="outlined" />}
        <Typography variant="caption" color="text.secondary">
          Query flags: <code>m_accountrefchanged</code>=
          {searchParams.get('m_accountrefchanged') ?? '—'} · <code>txt_loadleasedatafromdb</code>=
          {searchParams.get('txt_loadleasedatafromdb') ?? '—'}
        </Typography>
      </Stack>

      <Paper variant="outlined" sx={{ p: 0, overflow: 'hidden' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="stretch">
          {!txt_nobuttons && (
            <Box
              component="nav"
              sx={{
                width: { xs: '100%', md: 240 },
                flexShrink: 0,
                borderRight: { md: 1 },
                borderBottom: { xs: 1, md: 0 },
                borderColor: 'divider',
                bgcolor: 'background.paper',
                py: 1,
              }}
            >
              <List dense disablePadding>
                {navItems.map((item) => (
                  <ListItemButton
                    key={item.key || 'main'}
                    selected={custSubmenu === item.key}
                    onClick={() => setCustSubmenu(item.key)}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItemButton>
                ))}
              </List>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', px: 2, pb: 1, pt: 0.5 }}
              >
                History, payments, and contact log can be linked here when ready.
              </Typography>
            </Box>
          )}

          <Box sx={{ flex: 1, p: 2, bgcolor: 'background.default' }}>
            {custSubmenu === 'PPOINT' && (
              <Alert severity="info">
                Payment points (legacy iframe: <code>paymentpoints.asp</code>) — integrate here.
              </Alert>
            )}
            {custSubmenu === 'OVERDUEPP' && (
              <Alert severity="info">
                Overdue payment points (legacy iframe) — integrate here.
              </Alert>
            )}

            {showLeaseList && (
              <Box sx={{ mb: existing ? 0 : 2 }}>
                <Typography variant="h6" gutterBottom>
                  Leases for customer ref:{' '}
                  <Typography component="span" color="primary">
                    {txt_accountref}
                  </Typography>{' '}
                  — {form.txt_name || row?.name || '—'}
                </Typography>
                {leaseRows.length === 0 ? (
                  <Typography color="text.secondary">No leases for this customer.</Typography>
                ) : (
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow
                          sx={(theme) => ({
                            bgcolor: theme.palette.primary.main,
                            '& th': { color: theme.palette.primary.contrastText, fontWeight: 600 },
                          })}
                        >
                          <TableCell>Agreement number</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Start</TableCell>
                          <TableCell>End</TableCell>
                          <TableCell>Rental</TableCell>
                          <TableCell>Payment frequency</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {leaseRows.map((L) => (
                          <TableRow key={L.id} hover>
                            <TableCell>{L.leaseId}</TableCell>
                            <TableCell>{L.leaseStatus}</TableCell>
                            <TableCell>{L.leaseDesc}</TableCell>
                            <TableCell>{L.startDate}</TableCell>
                            <TableCell>{L.endDate}</TableCell>
                            <TableCell>{L.paymentAmount}</TableCell>
                            <TableCell>{L.payFreq ?? '—'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}

            {!showLeaseList && (
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} alignItems="flex-start">
                  <Card
                    variant="outlined"
                    sx={{ flex: 1, minWidth: 280, bgcolor: 'background.paper' }}
                  >
                    <CardContent>
                      <Stack spacing={1.5}>
                        <TextField
                          required
                          label="Account Ref"
                          value={form.txt_accountref}
                          onChange={(e) => setField('txt_accountref', e.target.value.toUpperCase())}
                          onBlur={onAccountRefBlur}
                          disabled={existing}
                          inputProps={{ maxLength: 8 }}
                          helperText={
                            existing
                              ? ''
                              : 'Click Enter and wait for screen to refresh (legacy hint).'
                          }
                        />
                        <TextField
                          required
                          label="Name"
                          value={form.txt_name}
                          onChange={(e) => setField('txt_name', e.target.value)}
                          disabled={readOnly}
                          helperText="(max 60 chars)"
                          inputProps={{ maxLength: 60 }}
                        />
                        <FormControl fullWidth disabled={readOnly}>
                          <InputLabel>Sector</InputLabel>
                          <Select
                            label="Sector"
                            value={form.txt_sectorid === '' ? '' : String(form.txt_sectorid)}
                            onChange={(e) => {
                              const v = e.target.value
                              setForm((f) => ({
                                ...f,
                                txt_sectorid: v,
                                txt_secsectorid: '',
                              }))
                            }}
                          >
                            <MenuItem value="">
                              <em>Select</em>
                            </MenuItem>
                            {MOCK_SECTORS.map((s) => (
                              <MenuItem key={s.id} value={String(s.id)}>
                                {s.description}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl fullWidth disabled={readOnly}>
                          <InputLabel>Legal Status</InputLabel>
                          <Select
                            label="Legal Status"
                            value={form.txt_secsectorid === '' ? '' : String(form.txt_secsectorid)}
                            onChange={(e) => setField('txt_secsectorid', e.target.value)}
                          >
                            <MenuItem value="">
                              <em>Select</em>
                            </MenuItem>
                            {legalOptions.map((s) => (
                              <MenuItem key={s.id} value={String(s.id)}>
                                {s.description}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          label="Notes"
                          value={form.txt_notes}
                          onChange={(e) => setField('txt_notes', e.target.value)}
                          disabled={readOnly}
                          multiline
                          minRows={3}
                        />
                        <Typography variant="subtitle2" color="text.secondary">
                          Contacts (legacy: <code>contacts_list.asp</code> iframe + Add/Edit
                          Contact)
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.paper' }}>
                          <Typography variant="body2" color="text.secondary">
                            Embed your contacts grid or link to a contacts route for account{' '}
                            <strong>{txt_accountref}</strong>.
                          </Typography>
                        </Paper>
                        {isEditing && (
                          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
                            <Button variant="contained" color="primary" onClick={onSave}>
                              Save school
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => {
                                setIsEditing(false)
                                setForm(
                                  fromListRow(
                                    txt_accountref,
                                    findCustomerByAccountRef(txt_accountref),
                                  ),
                                )
                              }}
                            >
                              Cancel
                            </Button>
                          </Stack>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{ flex: 1, minWidth: 280, bgcolor: 'background.paper' }}
                  >
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="text.primary"
                        gutterBottom
                      >
                        Registered address
                      </Typography>
                      <Stack spacing={1}>
                        {[
                          'txt_regaddress1',
                          'txt_regaddress2',
                          'txt_regaddress3',
                          'txt_regaddress4',
                          'txt_regaddress5',
                        ].map((name, i) => (
                          <TextField
                            key={name}
                            label={['Street 1', 'Street 2', 'Town', 'County', 'Post Code'][i]}
                            value={form[name]}
                            onChange={(e) => setField(name, e.target.value)}
                            disabled={readOnly}
                          />
                        ))}
                      </Stack>
                      <Divider sx={{ my: 2 }} />
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                          Delivery address
                        </Typography>
                        {isEditing && (
                          <Button size="small" variant="outlined" onClick={copyRegToDelivery}>
                            As Above
                          </Button>
                        )}
                      </Stack>
                      <Stack spacing={1}>
                        {[
                          'txt_deladdress1',
                          'txt_deladdress2',
                          'txt_deladdress3',
                          'txt_deladdress4',
                          'txt_deladdress5',
                        ].map((name, i) => (
                          <TextField
                            key={name}
                            label={['Street 1', 'Street 2', 'Town', 'County', 'Post Code'][i]}
                            value={form[name]}
                            onChange={(e) => setField(name, e.target.value)}
                            disabled={readOnly}
                          />
                        ))}
                      </Stack>
                      <Divider sx={{ my: 2 }} />
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                          Invoice name and address
                        </Typography>
                        {isEditing && (
                          <Button size="small" variant="outlined" onClick={copyRegToInvoice}>
                            As Above
                          </Button>
                        )}
                      </Stack>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ mb: 1 }}
                      >
                        Only if different from the registered name and address.
                      </Typography>
                      <Stack spacing={1}>
                        <TextField
                          label="Name"
                          value={form.txt_invname}
                          onChange={(e) => setField('txt_invname', e.target.value)}
                          disabled={readOnly}
                        />
                        {[
                          'txt_invaddress1',
                          'txt_invaddress2',
                          'txt_invaddress3',
                          'txt_invaddress4',
                          'txt_invaddress5',
                        ].map((name, i) => (
                          <TextField
                            key={name}
                            label={['Street 1', 'Street 2', 'Town', 'County', 'Post Code'][i]}
                            value={form[name]}
                            onChange={(e) => setField(name, e.target.value)}
                            disabled={readOnly}
                          />
                        ))}
                      </Stack>
                      <TextField
                        sx={{ mt: 2 }}
                        label="Website"
                        value={form.txt_website}
                        onChange={(e) => setField('txt_website', e.target.value)}
                        disabled={readOnly}
                      />
                      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.chkpaper}
                              onChange={(e) => setField('chkpaper', e.target.checked)}
                              disabled={readOnly}
                            />
                          }
                          label="Paper invoices"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.chkemail}
                              onChange={(e) => setField('chkemail', e.target.checked)}
                              disabled={readOnly}
                            />
                          }
                          label="Email invoices"
                        />
                      </Stack>
                      <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        value={form.txt_email1}
                        onChange={(e) => setField('txt_email1', e.target.value)}
                        disabled={readOnly}
                      />
                    </CardContent>
                  </Card>
                </Stack>

                {existing && !isEditing && !txt_nobuttons && (
                  <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                    Edit school
                  </Button>
                )}
              </Stack>
            )}
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

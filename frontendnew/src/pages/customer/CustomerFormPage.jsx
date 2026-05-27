import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import MainCard from 'components/MainCard';
import { buildCustomerFormSearch } from './customerFormPaths';
import { findCustomerByAccountRef, leasesForAccount, MOCK_LEGAL_STATUSES, MOCK_SECTORS } from './customerMockData';

const addressFields = ['txt_regaddress1', 'txt_regaddress2', 'txt_regaddress3', 'txt_regaddress4', 'txt_regaddress5'];
const addressLabels = ['Street 1', 'Street 2', 'Town', 'County', 'Post Code'];

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
    txt_website: ''
  };
}

function fromListRow(accountRef, row) {
  if (!row) return emptyForm(accountRef);
  return {
    ...emptyForm(row.accountRef),
    txt_name: row.name,
    txt_sectorid: row.sectorId || '',
    txt_secsectorid: row.legalStatusId || '',
    txt_notes: row.notes || '',
    txt_regaddress3: row.town || '',
    txt_regaddress4: row.county || '',
    txt_regaddress5: row.postcode || '',
    txt_deladdress3: row.town || '',
    txt_deladdress4: row.county || '',
    txt_deladdress5: row.postcode || '',
    chkpaper: !!row.paperInvoices,
    chkemail: !!row.emailInvoices,
    txt_email1: row.email || '',
    txt_website: row.website || ''
  };
}

export default function CustomerFormPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accountRef = (searchParams.get('txt_accountref') || '').trim().toUpperCase();
  const hideSubmenu = searchParams.get('txt_nobuttons') === 'YES';
  const loadLease = searchParams.get('txt_loadleasedatafromdb') === 'YES';

  const row = useMemo(() => findCustomerByAccountRef(accountRef), [accountRef]);
  const leaseRows = useMemo(() => leasesForAccount(accountRef), [accountRef]);
  const existing = !!row;

  const [submenu, setSubmenu] = useState('');
  const [isEditing, setIsEditing] = useState(!existing);
  const [form, setForm] = useState(() => fromListRow(accountRef, row));

  useEffect(() => {
    setForm(fromListRow(accountRef, findCustomerByAccountRef(accountRef)));
    setSubmenu('');
    setIsEditing(!findCustomerByAccountRef(accountRef));
  }, [accountRef]);

  const readOnly = existing && !isEditing;
  const legalOptions = useMemo(
    () => MOCK_LEGAL_STATUSES.filter((status) => String(status.parentId) === String(form.txt_sectorid)),
    [form.txt_sectorid]
  );

  const setField = useCallback((key, value) => setForm((current) => ({ ...current, [key]: value })), []);

  const copyAddress = (prefix) => {
    setForm((current) => ({
      ...current,
      ...(prefix === 'del' && {
        txt_deladdress1: current.txt_regaddress1,
        txt_deladdress2: current.txt_regaddress2,
        txt_deladdress3: current.txt_regaddress3,
        txt_deladdress4: current.txt_regaddress4,
        txt_deladdress5: current.txt_regaddress5
      }),
      ...(prefix === 'inv' && {
        txt_invname: current.txt_name,
        txt_invaddress1: current.txt_regaddress1,
        txt_invaddress2: current.txt_regaddress2,
        txt_invaddress3: current.txt_regaddress3,
        txt_invaddress4: current.txt_regaddress4,
        txt_invaddress5: current.txt_regaddress5
      })
    }));
  };

  const onSave = () => {
    if (!String(form.txt_accountref).trim() || !String(form.txt_name).trim()) {
      window.alert('Account Ref and Name are required.');
      return;
    }
    window.alert('Save is ready to connect to the school API.');
  };

  if (!accountRef) {
    return (
      <MainCard title="School Form">
        <Alert severity="warning" sx={{ mb: 2 }}>
          Missing account reference. Open this page from the Schools list or enter a reference.
        </Alert>
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={1}>
          <TextField
            label="Account Ref"
            value={form.txt_accountref}
            onChange={(event) => setField('txt_accountref', event.target.value.toUpperCase())}
          />
          <Button variant="contained" onClick={() => navigate(buildCustomerFormSearch(form.txt_accountref))}>
            Open
          </Button>
          <Button component={RouterLink} to="/customers" variant="outlined">
            Back to schools
          </Button>
        </Stack>
      </MainCard>
    );
  }

  return (
    <MainCard
      title="School Form"
      secondary={
        <Button component={RouterLink} to="/customers" variant="outlined">
          Back to schools
        </Button>
      }
      contentSX={{ p: 0 }}
    >
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
          <Chip label={accountRef} color="primary" size="small" />
          {loadLease && <Chip label="Load lease data" size="small" variant="outlined" />}
          <Typography variant="body2" color="text.secondary">
            {form.txt_name || 'New school'}
          </Typography>
        </Stack>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} alignItems="stretch">
        {!hideSubmenu && (
          <Box
            sx={{
              width: { xs: '100%', md: 230 },
              flexShrink: 0,
              borderRight: { md: 1 },
              borderBottom: { xs: 1, md: 0 },
              borderColor: 'divider'
            }}
          >
            <List dense disablePadding sx={{ py: 1 }}>
              {[
                { key: '', label: 'School details' },
                { key: 'LEASE', label: 'Leases' },
                { key: 'PPOINT', label: 'Payment points' },
                { key: 'OVERDUEPP', label: 'Overdue invoices' }
              ].map((item) => (
                <ListItemButton key={item.key || 'details'} selected={submenu === item.key} onClick={() => setSubmenu(item.key)}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        )}

        <Box sx={{ flex: 1, p: 2.5 }}>
          {submenu === 'PPOINT' && <Alert severity="info">Payment points can be connected here.</Alert>}
          {submenu === 'OVERDUEPP' && <Alert severity="info">Overdue invoices can be connected here.</Alert>}

          {submenu === 'LEASE' && (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Agreement number</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Start</TableCell>
                    <TableCell>End</TableCell>
                    <TableCell>Rental</TableCell>
                    <TableCell>Frequency</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaseRows.map((lease) => (
                    <TableRow key={lease.id} hover>
                      <TableCell>{lease.leaseId}</TableCell>
                      <TableCell>{lease.leaseStatus}</TableCell>
                      <TableCell>{lease.leaseDesc}</TableCell>
                      <TableCell>{lease.startDate}</TableCell>
                      <TableCell>{lease.endDate}</TableCell>
                      <TableCell>{lease.paymentAmount}</TableCell>
                      <TableCell>{lease.payFreq}</TableCell>
                    </TableRow>
                  ))}
                  {!leaseRows.length && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No leases for this school.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {!submenu && (
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} alignItems="flex-start">
                <Card variant="outlined" sx={{ flex: 1, width: '100%' }}>
                  <CardContent>
                    <Stack spacing={1.5}>
                      <TextField
                        required
                        label="Account Ref"
                        value={form.txt_accountref}
                        onChange={(event) => setField('txt_accountref', event.target.value.toUpperCase())}
                        onBlur={() =>
                          form.txt_accountref &&
                          form.txt_accountref !== accountRef &&
                          navigate(buildCustomerFormSearch(form.txt_accountref))
                        }
                        disabled={existing}
                      />
                      <TextField
                        required
                        label="Name"
                        value={form.txt_name}
                        onChange={(event) => setField('txt_name', event.target.value)}
                        disabled={readOnly}
                      />
                      <FormControl fullWidth disabled={readOnly}>
                        <InputLabel>Sector</InputLabel>
                        <Select
                          label="Sector"
                          value={form.txt_sectorid === '' ? '' : String(form.txt_sectorid)}
                          onChange={(event) =>
                            setForm((current) => ({ ...current, txt_sectorid: event.target.value, txt_secsectorid: '' }))
                          }
                        >
                          <MenuItem value="">
                            <em>Select</em>
                          </MenuItem>
                          {MOCK_SECTORS.map((sector) => (
                            <MenuItem key={sector.id} value={String(sector.id)}>
                              {sector.description}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth disabled={readOnly}>
                        <InputLabel>Legal Status</InputLabel>
                        <Select
                          label="Legal Status"
                          value={form.txt_secsectorid === '' ? '' : String(form.txt_secsectorid)}
                          onChange={(event) => setField('txt_secsectorid', event.target.value)}
                        >
                          <MenuItem value="">
                            <em>Select</em>
                          </MenuItem>
                          {legalOptions.map((status) => (
                            <MenuItem key={status.id} value={String(status.id)}>
                              {status.description}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        label="Notes"
                        value={form.txt_notes}
                        onChange={(event) => setField('txt_notes', event.target.value)}
                        disabled={readOnly}
                        multiline
                        minRows={3}
                      />
                    </Stack>
                  </CardContent>
                </Card>

                <Card variant="outlined" sx={{ flex: 1, width: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Registered address
                    </Typography>
                    <Stack spacing={1}>
                      {addressFields.map((name, index) => (
                        <TextField
                          key={name}
                          label={addressLabels[index]}
                          value={form[name]}
                          onChange={(event) => setField(name, event.target.value)}
                          disabled={readOnly}
                        />
                      ))}
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Delivery address
                      </Typography>
                      {isEditing && (
                        <Button size="small" variant="outlined" onClick={() => copyAddress('del')}>
                          As Above
                        </Button>
                      )}
                    </Stack>
                    <Stack spacing={1}>
                      {addressLabels.map((label, index) => {
                        const name = `txt_deladdress${index + 1}`;
                        return (
                          <TextField
                            key={name}
                            label={label}
                            value={form[name]}
                            onChange={(event) => setField(name, event.target.value)}
                            disabled={readOnly}
                          />
                        );
                      })}
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Invoice address
                      </Typography>
                      {isEditing && (
                        <Button size="small" variant="outlined" onClick={() => copyAddress('inv')}>
                          As Above
                        </Button>
                      )}
                    </Stack>
                    <Stack spacing={1}>
                      <TextField
                        label="Name"
                        value={form.txt_invname}
                        onChange={(event) => setField('txt_invname', event.target.value)}
                        disabled={readOnly}
                      />
                      {addressLabels.map((label, index) => {
                        const name = `txt_invaddress${index + 1}`;
                        return (
                          <TextField
                            key={name}
                            label={label}
                            value={form[name]}
                            onChange={(event) => setField(name, event.target.value)}
                            disabled={readOnly}
                          />
                        );
                      })}
                      <TextField
                        label="Website"
                        value={form.txt_website}
                        onChange={(event) => setField('txt_website', event.target.value)}
                        disabled={readOnly}
                      />
                      <Stack direction="row" spacing={2}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.chkpaper}
                              onChange={(event) => setField('chkpaper', event.target.checked)}
                              disabled={readOnly}
                            />
                          }
                          label="Paper invoices"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.chkemail}
                              onChange={(event) => setField('chkemail', event.target.checked)}
                              disabled={readOnly}
                            />
                          }
                          label="Email invoices"
                        />
                      </Stack>
                      <TextField
                        label="Email"
                        type="email"
                        value={form.txt_email1}
                        onChange={(event) => setField('txt_email1', event.target.value)}
                        disabled={readOnly}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>

              {isEditing ? (
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" onClick={onSave}>
                    Save school
                  </Button>
                  <Button variant="outlined" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </Stack>
              ) : (
                <Button variant="contained" onClick={() => setIsEditing(true)} sx={{ alignSelf: 'flex-start' }}>
                  Edit school
                </Button>
              )}
            </Stack>
          )}
        </Box>
      </Stack>
    </MainCard>
  );
}

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import api from 'api/client';
import DataTablePagination from 'components/DataTablePagination';
import MainCard from 'components/MainCard';
import { buildCustomerFormSearch } from './customerFormPaths';
import { MOCK_CUSTOMERS, MOCK_LEASE_ROWS } from './customerMockData';

const getFallbackRows = (sortMode, searchText) => {
  const text = searchText.trim().toLowerCase();
  const source = sortMode === 'leaseid' ? MOCK_LEASE_ROWS : MOCK_CUSTOMERS;
  if (!text) return source;

  return source.filter((row) =>
    [row.accountRef, row.name, row.town, row.county, row.postcode, row.leaseId, row.leaseDesc].some((value) =>
      String(value || '')
        .toLowerCase()
        .includes(text)
    )
  );
};

export default function CustomerPage() {
  const navigate = useNavigate();
  const [sortMode, setSortMode] = useState('custref');
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });

  const pagedRows = useMemo(() => rows.slice(0, paginationModel.pageSize), [rows, paginationModel.pageSize]);

  const loadRows = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const endpoint = sortMode === 'leaseid' ? '/customers/by-lease' : '/customers/by-school';
      const response = await api.get(endpoint, {
        params: {
          search: searchText,
          page: paginationModel.page + 1,
          pageSize: paginationModel.pageSize
        }
      });

      setRows(response.data?.data || []);
      setRowCount(response.data?.total || 0);
    } catch (err) {
      const fallback = getFallbackRows(sortMode, searchText);
      const start = paginationModel.page * paginationModel.pageSize;
      setRows(fallback.slice(start, start + paginationModel.pageSize));
      setRowCount(fallback.length);
      setError(
        err?.response?.status === 403 ? 'You do not have permission to view this data.' : 'Showing sample data until the API is available.'
      );
    } finally {
      setLoading(false);
    }
  }, [paginationModel.page, paginationModel.pageSize, searchText, sortMode]);

  useEffect(() => {
    const timeout = window.setTimeout(loadRows, 300);
    return () => window.clearTimeout(timeout);
  }, [loadRows]);

  return (
    <MainCard
      title="Schools"
      secondary={
        <Button variant="contained" component={RouterLink} to="/customers/form">
          New School
        </Button>
      }
      contentSX={{ p: 0 }}
    >
      <Box sx={{ p: 2.5 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} justifyContent="space-between" gap={2}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="subtitle2">View</Typography>
            {/* <ToggleButtonGroup
              exclusive
              size="small"
              color="primary"
              value={sortMode}
              onChange={(_, value) => {
                if (!value) return;
                setSortMode(value);
                setPaginationModel((current) => ({ ...current, page: 0 }));
              }}
            >
              <ToggleButton value="custref">By school</ToggleButton>
              <ToggleButton value="leaseid">By lease</ToggleButton>
            </ToggleButtonGroup> */}
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={1}>
            <TextField
              label={sortMode === 'leaseid' ? 'Search lease' : 'Search school'}
              size="small"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setPaginationModel((current) => ({ ...current, page: 0 }));
              }}
            />
            <Button variant="outlined" onClick={loadRows}>
              Search
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                setSearchText('');
                setPaginationModel((current) => ({ ...current, page: 0 }));
              }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
        {error && (
          <Alert severity={error.startsWith('Showing') ? 'info' : 'error'} sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>

      <TableContainer>
        <Table size="small" sx={{ minWidth: sortMode === 'leaseid' ? 1100 : 760 }}>
          <TableHead>
            <TableRow>
              <TableCell>ACC REF</TableCell>
              <TableCell>Customer</TableCell>
              {sortMode !== 'leaseid' && <TableCell>Town</TableCell>}
              {sortMode !== 'leaseid' && <TableCell>County</TableCell>}
              <TableCell>Post Code</TableCell>
              <TableCell>Contact / Phone</TableCell>
              {sortMode === 'leaseid' && <TableCell>Lease ID</TableCell>}
              {sortMode === 'leaseid' && <TableCell>Description</TableCell>}
              {sortMode === 'leaseid' && <TableCell>Status</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedRows.map((row) => (
              <TableRow
                key={`${row.id}-${row.accountRef}`}
                hover
                onClick={() => navigate(buildCustomerFormSearch(row.accountRef))}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Link
                    component={RouterLink}
                    to={buildCustomerFormSearch(row.accountRef)}
                    underline="hover"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {row.accountRef}
                  </Link>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                {sortMode !== 'leaseid' && <TableCell>{row.town}</TableCell>}
                {sortMode !== 'leaseid' && <TableCell>{row.county}</TableCell>}
                <TableCell>{row.postcode}</TableCell>
                <TableCell>{[row.contact, row.phone].filter(Boolean).join(' - ')}</TableCell>
                {sortMode === 'leaseid' && <TableCell>{row.leaseId}</TableCell>}
                {sortMode === 'leaseid' && <TableCell>{row.leaseDesc}</TableCell>}
                {sortMode === 'leaseid' && <TableCell>{[row.termination, row.leaseStatus].filter(Boolean).join(' - ')}</TableCell>}
              </TableRow>
            ))}
            {!pagedRows.length && (
              <TableRow>
                <TableCell colSpan={sortMode === 'leaseid' ? 9 : 6} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                    {loading ? 'Loading schools...' : 'No schools found.'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <DataTablePagination
        page={paginationModel.page}
        pageSize={paginationModel.pageSize}
        rowCount={rowCount}
        pageSizeOptions={[10, 25, 50, 100]}
        onPageChange={(nextPage) => setPaginationModel((current) => ({ ...current, page: nextPage }))}
        onPageSizeChange={(nextPageSize) => setPaginationModel({ page: 0, pageSize: nextPageSize })}
      />
    </MainCard>
  );
}

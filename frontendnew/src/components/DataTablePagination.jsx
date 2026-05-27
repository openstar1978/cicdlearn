import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

const getVisiblePages = (page, pageCount) => {
  const maxButtons = 5;
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(0, page - half);
  const end = Math.min(pageCount, start + maxButtons);

  if (end - start < maxButtons) start = Math.max(0, end - maxButtons);

  return Array.from({ length: end - start }, (_, index) => start + index);
};

export default function DataTablePagination({ page, pageSize, rowCount, pageSizeOptions = [10, 25, 50], onPageChange, onPageSizeChange }) {
  const pageCount = Math.max(1, Math.ceil(rowCount / pageSize));
  const from = rowCount === 0 ? 0 : page * pageSize + 1;
  const to = Math.min(rowCount, (page + 1) * pageSize);

  return (
    <Box
      sx={{
        px: 2,
        py: 1.25,
        borderTop: 1,
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        flexWrap: { xs: 'wrap', md: 'nowrap' }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Typography variant="body2" color="text.secondary">
          Show
        </Typography>
        <Select
          size="small"
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          sx={{ height: 32, minWidth: 72 }}
        >
          {pageSizeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="body2" color="text.secondary">
          entries
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Showing {from} to {to} of {rowCount} entries
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, ml: 'auto' }}>
        <Button variant="outlined" size="small" disabled={page === 0} onClick={() => onPageChange(page - 1)}>
          Previous
        </Button>
        {getVisiblePages(page, pageCount).map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? 'contained' : 'outlined'}
            size="small"
            onClick={() => onPageChange(pageNumber)}
            sx={{ minWidth: 34 }}
          >
            {pageNumber + 1}
          </Button>
        ))}
        <Button variant="outlined" size="small" disabled={page >= pageCount - 1} onClick={() => onPageChange(page + 1)}>
          Next
        </Button>
      </Box>
    </Box>
  );
}

import React from 'react'
import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import { adminColors } from '../theme'

const getVisiblePages = (page, pageCount) => {
  const maxButtons = 5
  const half = Math.floor(maxButtons / 2)
  let start = Math.max(0, page - half)
  const end = Math.min(pageCount, start + maxButtons)

  if (end - start < maxButtons) {
    start = Math.max(0, end - maxButtons)
  }

  return Array.from({ length: end - start }, (_, index) => start + index)
}

function DataTablePagination({
  page,
  pageSize,
  rowCount,
  pageSizeOptions = [5, 10, 25, 50],
  onPageChange,
  onPageSizeChange,
}) {
  const pageCount = Math.max(1, Math.ceil(rowCount / pageSize))
  const from = rowCount === 0 ? 0 : page * pageSize + 1
  const to = Math.min(rowCount, (page + 1) * pageSize)
  const visiblePages = getVisiblePages(page, pageCount)

  const buttonSx = {
    minWidth: 32,
    width: 32,
    height: 32,
    p: 0,
    borderRadius: '4px',
    borderColor: adminColors.border,
    color: adminColors.text,
    bgcolor: '#ffffff',
    '&:hover': {
      borderColor: adminColors.darkBlue,
      bgcolor: '#f9fafb',
    },
    '&.Mui-disabled': {
      borderColor: adminColors.border,
      color: '#9ca3af',
      bgcolor: '#f9fafb',
    },
  }

  return (
    <Box
      className="datatable-pagination"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      sx={{
        px: 2,
        py: 1.25,
        bgcolor: '#ffffff',
        borderTop: `1px solid ${adminColors.border}`,
        flexWrap: { xs: 'wrap', md: 'nowrap' },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          flex: '1 1 auto',
          minWidth: 0,
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Show
        </Typography>
        <Select
          size="small"
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          sx={{
            height: 32,
            minWidth: 72,
            fontSize: 13,
            '.MuiSelect-select': { py: 0.5 },
          }}
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
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            ml: { sm: 1 },
            whiteSpace: 'nowrap',
          }}
        >
          Showing {from} to {to} of {rowCount} entries
        </Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        gap={0.75}
        sx={{
          flex: '0 0 auto',
          ml: 'auto',
          width: { xs: '100%', md: 'auto' },
        }}
      >
        <Button
          variant="outlined"
          size="small"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          sx={buttonSx}
        >
          ‹
        </Button>

        {visiblePages.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? 'contained' : 'outlined'}
            size="small"
            onClick={() => onPageChange(pageNumber)}
            sx={{
              ...buttonSx,
              ...(pageNumber === page && {
                borderColor: adminColors.darkBlue,
                bgcolor: adminColors.darkBlue,
                color: '#ffffff',
                '&:hover': {
                  borderColor: adminColors.darkBlueAlt,
                  bgcolor: adminColors.darkBlueAlt,
                },
              }),
            }}
          >
            {pageNumber + 1}
          </Button>
        ))}

        <Button
          variant="outlined"
          size="small"
          disabled={page >= pageCount - 1}
          onClick={() => onPageChange(page + 1)}
          sx={buttonSx}
        >
          ›
        </Button>
      </Box>
    </Box>
  )
}

export default DataTablePagination

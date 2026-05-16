import { alpha, createTheme } from '@mui/material/styles'

const adminColors = {
  darkBlue: '#172554',
  darkBlueAlt: '#1e3a8a',
  brightBlue: '#0ea5e9',
  brightBlueHover: '#0284c7',
  neutral: '#64748b',
  border: '#e2e8f0',
  text: '#0f172a',
  pageBg: '#f8fafc',
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: adminColors.darkBlue,
      contrastText: '#ffffff',
    },
    secondary: {
      main: adminColors.brightBlue,
      contrastText: '#ffffff',
    },
    text: {
      primary: adminColors.text,
      secondary: adminColors.neutral,
    },
    background: {
      default: adminColors.pageBg,
    },
    DataGrid: {
      bg: '#ffffff',
      pinnedBg: '#eef5fb',
      headerBg: adminColors.darkBlue,
    },
  },

  typography: {
    fontFamily: 'Roboto, Arial',
    h5: {
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: adminColors.brightBlue,
          '&:hover': {
            backgroundColor: adminColors.brightBlueHover,
          },
        },
        outlinedPrimary: {
          borderColor: adminColors.brightBlue,
          color: adminColors.brightBlue,
          '&:hover': {
            borderColor: adminColors.darkBlue,
            backgroundColor: alpha(adminColors.brightBlue, 0.08),
            color: adminColors.darkBlue,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderColor: adminColors.border,
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          overflow: 'hidden',
        },
        columnHeaders: {
          backgroundColor: adminColors.darkBlue,
          color: '#ffffff',
          borderBottom: `2px solid ${adminColors.brightBlue}`,
        },
        columnHeader: {
          '&:focus, &:focus-within': {
            outline: 'none',
          },
        },
        columnHeaderTitle: {
          fontWeight: 700,
        },
        cell: {
          borderBottomColor: adminColors.border,
          '&:focus, &:focus-within': {
            outline: 'none',
          },
        },
        row: {
          '&:hover': {
            backgroundColor: alpha(adminColors.brightBlue, 0.08),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(adminColors.brightBlue, 0.16),
            '&:hover': {
              backgroundColor: alpha(adminColors.brightBlue, 0.22),
            },
          },
        },
        footerContainer: {
          borderTopColor: adminColors.border,
          backgroundColor: '#ffffff',
          color: adminColors.text,
        },
        toolbarContainer: {
          color: adminColors.text,
        },
        selectedRowCount: {
          color: adminColors.text,
        },
        withBorderColor: {
          borderColor: adminColors.border,
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

export { adminColors }
export default theme

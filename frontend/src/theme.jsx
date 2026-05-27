import { alpha, createTheme } from '@mui/material/styles'

const adminColors = {
  darkBlue: '#0f2a44',
  darkBlueAlt: '#143d63',
  brightBlue: '#1d9bd7',
  brightBlueHover: '#0b75b7',
  sidebarGrey: '#4b5563',
  sidebarGreyDark: '#374151',
  neutral: '#6b7280',
  border: '#d1d5db',
  headerBg: '#f3f4f6',
  text: '#111827',
  pageBg: '#f5f7fa',
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
      pinnedBg: '#f9fafb',
      headerBg: adminColors.headerBg,
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
          backgroundColor: adminColors.darkBlue,
          '&:hover': {
            backgroundColor: adminColors.darkBlueAlt,
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
          backgroundColor: adminColors.headerBg,
          color: adminColors.text,
          borderBottom: `2px solid ${adminColors.border}`,
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

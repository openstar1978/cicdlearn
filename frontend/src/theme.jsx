import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // change to "dark" later if needed
    primary: {
      main: "#000066",   // your brand color
    },
    secondary: {
      main: "#c4c4ff",
    },
    background: {
      default: "#f4f6f9",
    },
  },

  typography: {
    fontFamily: "Roboto, Arial",
    h5: {
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

export default theme;
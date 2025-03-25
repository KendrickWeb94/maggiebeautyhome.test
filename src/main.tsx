import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3b82f6", // Example primary color
    },
    secondary: {
      main: "#6c757d", // Example secondary color
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);

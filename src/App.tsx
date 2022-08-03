import React from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { OrderModal } from "./components/OrderModal";
import {
  createTheme,
  SimplePaletteColorOptions,
  ThemeProvider,
} from "@mui/material";
import { Login } from "./components/Login";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: SimplePaletteColorOptions;
    failure: SimplePaletteColorOptions;
    blue: SimplePaletteColorOptions;
    border: SimplePaletteColorOptions;
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: SimplePaletteColorOptions;
    failure?: SimplePaletteColorOptions;
    blue?: SimplePaletteColorOptions;
    border?: SimplePaletteColorOptions;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface PalettePropsOverrides {
    neutral: true;
    failure: true;
    blue: true;
    border: true;
  }
}

const theme = createTheme({
  palette: {
    primary: { main: "rgba(68, 68, 68)" },
    secondary: { main: "rgba(169, 169, 169, 1)" },
    neutral: { main: "rgba(140, 140, 140, 1)" },
    success: { main: "rgba(76, 175, 80, 1)" },
    failure: { main: "rgba(223, 81, 76, 1)" },
    blue: { main: "rgba(21, 84, 146, 1)" },
    border: { main: "rgba(230, 230, 230, 1)" },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <Header />
                <Main />
                <OrderModal />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

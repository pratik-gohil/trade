import React, { useEffect, useState } from "react";
import { Main } from "./components/Main";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WebSocketProvider from "./socket";
import { OrderModal } from "./components/OrderModal";
import {
  createTheme,
  SimplePaletteColorOptions,
  ThemeProvider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "./components/Login";
import { Header } from "./components/Header";
import { getUserProfile } from "./http/getUserProfile/getUserProfile";
import { setUserReducer } from "./features/Auth/Auth";
import { constants } from "./constants/global";
import Logout from "./components/Logout/Logout";
import { asyncLocalStorage } from "./utils/asyncLocalStorage";
import { RootState } from "./app/store";
const { TOKEN } = constants;

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

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export default function App() {
  const isLoggedIn = localStorage.getItem(TOKEN);
  const loginRequired = (Element) => {
    return isLoggedIn ? Element : <Navigate to="/login" />;
  };
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem(TOKEN)) {
        const userProfile = await getUserProfile();
        if (
          (userProfile.type === "error" &&
            userProfile.description === "Invalid Token") ||
          userProfile.description === "Token/Authorization not found"
        ) {
          asyncLocalStorage.clear().then(() => {
            window.location.href = "/";
          });
        }
        if (userProfile.type === "success") {
          dispatch(setUserReducer(userProfile.result));
        }
      }
    })();
  }, [dispatch]);

  const [theme] = useState(() =>
    createTheme({
      typography: {
        allVariants: {
          fontFamily: "Inter",
        },
      },
      palette: {
        primary: { main: `rgba(${cssVar("--primary")}, 1) ` },
        secondary: { main: `rgba(${cssVar("--secondary")}, 1) ` },
        neutral: { main: `rgba(${cssVar("--neutral")}, 1) ` },
        success: { main: `rgba(${cssVar("--success")}, 1) ` },
        failure: { main: `rgba(${cssVar("--failure")}, 1) ` },
        blue: { main: `rgba(${cssVar("--blue")}, 1) ` },
        border: { main: `rgba(${cssVar("--border")}, 1) ` },
      },
    })
  );

  const isOpen = useSelector((state: RootState) => state.orderModal.visible);

  return (
    <ThemeProvider theme={theme}>
      <WebSocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />}></Route>
            <Route path="/home" element={<Navigate to="/home/chart" />}></Route>
            <Route
              path="*"
              element={loginRequired(
                <>
                  <Header />
                  <Main />
                  {isOpen && <OrderModal />}
                </>
              )}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </WebSocketProvider>
    </ThemeProvider>
  );
}

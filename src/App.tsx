import React, { useEffect } from "react";
import { Main } from "./components/Main";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { OrderModal } from "./components/OrderModal";
import {
  createTheme,
  SimplePaletteColorOptions,
  ThemeProvider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Login } from "./components/Login";
import { Header } from "./components/Header";
import { getUserProfile } from "./http/getUserProfile/getUserProfile";
import { setUserReducer } from "./features/Auth/Auth";
import { io } from "socket.io-client";

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
  const isLoggedIn = localStorage.getItem("token");
  const loginRequired = (Element) => {
    return isLoggedIn ? Element : <Navigate to="/login" />;
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("https://devtrade.lkp.net.in", {
      path: "/marketdata/socket.io",
      // reconnection: false,
      query: {
        token: localStorage.getItem("token"),
        userID: localStorage.getItem("userID"),
        publishFormat: "JSON",
        broadcastMode: "Full",
      },
      transports: ["websocket"],
      // upgrade: true,
    });

    console.log(socket);

    socket.on("connect", () => {
      console.log("connected");
      console.log(socket);
    });

    socket.on("1501-json-full", (data) => {
      console.log("data is " + data);
    });

    socket.on("1502-json-full", (data) => {
      console.log("data is " + data);
    });

    socket.on("disconnect", () => {
      console.log("dc");
    });

    // return () => {
    //   socket.off("connect");
    //   socket.off("1502-json-full");
    //   socket.off("disconnect");
    // };
  }, []);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        const userProfile = await getUserProfile();
        if (userProfile.type === "success") {
          dispatch(setUserReducer(userProfile.result));
        }
      }
    })();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="*"
            element={loginRequired(
              <>
                <Header />
                <Main />
                <OrderModal />
              </>
            )}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { constants } from "./constants/global";
const { TOKEN, USER_ID } = constants;

export const socket = io(process.env.REACT_APP_API_BASE_URL || "", {
  path: "/marketdata/socket.io",
  query: {
    token: localStorage.getItem(TOKEN),
    userID: localStorage.getItem(USER_ID),
    publishFormat: "JSON",
    broadcastMode: "Full",
  },
  transports: ["websocket"],
});

const SocketContext = createContext({});

export { SocketContext };

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

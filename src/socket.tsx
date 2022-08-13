import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { TOKEN, USER_ID } from "./constants/global";

const SocketContext = createContext({});

export { SocketContext };

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socketinstance = io(process.env.REACT_APP_API_BASE_URL || "", {
      path: "/marketdata/socket.io",
      query: {
        token: localStorage.getItem(TOKEN),
        userID: localStorage.getItem(USER_ID),
        publishFormat: "JSON",
        broadcastMode: "Full",
      },
      transports: ["websocket"],
    });
    setSocket(socketinstance);
    if (socket) {
      socket?.on("disconnect", () => {
        console.log("disconnected");
      });
    }
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    socket && (
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    )
  );
};

export default SocketProvider;

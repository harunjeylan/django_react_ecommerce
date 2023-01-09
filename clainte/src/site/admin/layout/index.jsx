import React from "react";
import { MyProSidebarProvider } from "./SidebarContext";
import Topbar from "./Navbar";

const Admin = ({ children }) => {
  return (
    <MyProSidebarProvider>
      <main
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Topbar />
        {children}
      </main>
    </MyProSidebarProvider>
  );
};

export default Admin;

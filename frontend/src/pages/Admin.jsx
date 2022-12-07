import { MyProSidebarProvider } from "./global/sidebar/SidebarContext";
import Topbar from "./global/Topbar";
import React from "react";

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

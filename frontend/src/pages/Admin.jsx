import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./global/sidebar/SidebarContext";
import React from "react";
import { ColorModeContext, useMode } from "../theme";
import Topbar from "./global/Topbar";

// import Dashboard from "./dashboard";
// import Team from "./team";
// import Invoices from "./invoices";
// import Contacts from "./contacts";
// import Form from "./form";
// import Bar from "./bar";
// import Line from "./line";
// import Pie from "./pie";
// import FAQ from "./faq";

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

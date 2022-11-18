import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Home from "./pages/home/Home";

import ItemDetails from "./pages/itemDetails/ItemDetails";
import Checkout from "./pages/checkout/Checkout";
import Confirmation from "./pages/checkout/Confirmation";

import Admin from "./pages/Admin";
import Customer from "./pages/Customer";
import Dashboard from "./pages/dashboard";
import Team from "./pages/team";
import Invoices from "./pages/invoices";
import Contacts from "./pages/contacts";
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import FAQ from "./pages/faq";
import Form from "./pages/form";
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <Customer>
                  <Home />
                </Customer>
              }
            />
            <Route
              path="item/:itemId"
              element={
                <Customer>
                  <ItemDetails />
                </Customer>
              }
            />
            <Route
              path="checkout"
              element={
                <Customer>
                  <Checkout />
                </Customer>
              }
            />
            <Route
              path="checkout/success"
              element={
                <Customer>
                  <Confirmation />
                </Customer>
              }
            />
          </Route>
          <Route path="admin">
            <Route
              index
              element={
                <Admin>
                  <Dashboard />
                </Admin>
              }
            />
            <Route
              path="bar"
              element={
                <Admin>
                  <Bar />
                </Admin>
              }
            />
            <Route
              path="pie"
              element={
                <Admin>
                  <Pie />
                </Admin>
              }
            />
            <Route
              path="line"
              element={
                <Admin>
                  <Line />
                </Admin>
              }
            />
            <Route
              path="faq"
              element={
                <Admin>
                  <FAQ />
                </Admin>
              }
            />
            <Route
              path="form"
              element={
                <Admin>
                  <Form />
                </Admin>
              }
            />
            <Route
              path="contacts"
              element={
                <Admin>
                  <Contacts />
                </Admin>
              }
            />
            <Route
              path="invoices"
              element={
                <Admin>
                  <Invoices />
                </Admin>
              }
            />
            <Route
              path="team"
              element={
                <Admin>
                  <Team />
                </Admin>
              }
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

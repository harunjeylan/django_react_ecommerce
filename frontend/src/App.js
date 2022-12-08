import { Routes, Route } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Home from "./pages/home/Home";

import NewProduct from "./pages/products/new/NewProduct";
import ProductDetails from "./pages/products/details/ProductDetails";
import Checkout from "./pages/checkout/Checkout";
import ViewCart from "./pages/viewcart/ViewCart";
import Confirmation from "./pages/checkout/Confirmation";
import Shopping from "./pages/shopping";

import Profile from "./pages/profile/Profile";
import Address from "./pages/profile/Address";
import Orders from "./pages/profile/Orders";
import Wishlist from "./pages/profile/Wishlist";
import OderDetails from "./pages/profile/OderDetails";

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
            <Route path="profile">
              <Route
                index
                element={
                  <Customer>
                    <Profile />
                  </Customer>
                }
              />
              <Route
                path="orders"
                element={
                  <Customer>
                    <Orders />
                  </Customer>
                }
              />

              <Route
                path="orders/:orderId"
                element={
                  <Customer>
                    <OderDetails />
                  </Customer>
                }
              />
              <Route
                path="address"
                element={
                  <Customer>
                    <Address />
                  </Customer>
                }
              />
              <Route
                path="wishlist"
                element={
                  <Customer>
                    <Wishlist />
                  </Customer>
                }
              />
            </Route>
            <Route
              index
              element={
                <Customer>
                  <Home />
                </Customer>
              }
            />
            <Route
              path="product/:productId"
              element={
                <Customer>
                  <ProductDetails />
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
              path="viewcart"
              element={
                <Customer>
                  <ViewCart />
                </Customer>
              }
            />
            <Route
              path="shopping"
              element={
                <Customer>
                  <Shopping />
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
            <Route path="products">
              <Route
                index
                element={
                  <Admin>
                    <Dashboard />
                  </Admin>
                }
              />
              <Route
                path="new"
                element={
                  <Admin>
                    <NewProduct />
                  </Admin>
                }
              />
            </Route>
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

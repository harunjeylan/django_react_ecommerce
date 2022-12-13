//IMORTING LIBRARYS
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
//IMORTING APP SETUP
import PrivateRoutes from "./utils/PrivateRoutes";
import { ColorModeContext, useMode } from "./theme";
import AdminLayout from "./site/admin/layout";
import CustomerLayout from "./site/customers/layout";

//IMORTING ADMIN PAGE COMPONENTS

import Dashboard from "./site/admin/pages/dashboard";
import Team from "./site/admin/pages/team";
import Invoices from "./site/admin/pages/invoices";
import Contacts from "./site/admin/pages/contacts";
import FAQ from "./site/admin/pages/faq";
import { BarChart, LineChart, PieChart } from "./site/admin/pages/charts";
import { OrdersListAdmin, OrderDetailsAdmin } from "./site/admin/pages/orders";

import {
  ProductsListAdmin,
  NewProduct,
  ProductDetailsAdmin,
} from "./site/admin/pages/products";
import {
  CustomersList,
  CustomerDetails,
  NewCustomer,
} from "./site/admin/pages/customers";

// IMORTING Authentcation pages

import Login from "./site/auth/pages/Login";
import Register from "./site/auth/pages/Register";

//IMORTING CUSTOMERS PAGE COMPONENTS
import {
  Checkout,
  ViewCart,
  Confirmation,
} from "./site/customers/pages/checkout";
import {
  Profile,
  Address,
  Wishlist,
  OrdersListCustomer,
  OrderDetailsCustomer,
} from "./site/customers/pages/profile";
import Home from "./site/customers/pages/home";
import Shopping from "./site/customers/pages/shopping";
import { ProductDetailsCustomer } from "./site/customers/pages/products";
import {
  selectCurrentToken,
  selectCurrentRefresh,
} from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./features/auth/authSlice";
import { logOut } from "./features/auth/authSlice";
import { authApi } from "./app/api/authApi";
import { refreshAccessToken } from "./app/api/authApi";
import store from "./app/store";
function App() {
  const [theme, colorMode] = useMode();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectCurrentToken);
  const refreshToken = useSelector(selectCurrentRefresh);
  const fiveMinute = 1000 * 60 * 5;
  
  useEffect(() => {
    let interval = setInterval(() => {
      if (refreshToken) {
        refreshAccessToken(store);
      }
    }, fiveMinute);
    return () => clearInterval(interval);
  }, [accessToken]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Authentcation pages */}

          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          {/* ADMINIS SAITE */}
          <Route element={<PrivateRoutes />} path="admin">
            <Route
              index
              element={
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              }
            />
            <Route path="charts">
              <Route
                path="bar"
                element={
                  <AdminLayout>
                    <BarChart />
                  </AdminLayout>
                }
              />
              <Route
                path="pie"
                element={
                  <AdminLayout>
                    <PieChart />
                  </AdminLayout>
                }
              />
              <Route
                path="line"
                element={
                  <AdminLayout>
                    <LineChart />
                  </AdminLayout>
                }
              />
            </Route>
            <Route path="pages">
              <Route
                path="faq"
                element={
                  <AdminLayout>
                    <FAQ />
                  </AdminLayout>
                }
              />
              <Route
                path="newuser"
                element={
                  <AdminLayout>
                    <NewCustomer />
                  </AdminLayout>
                }
              />
            </Route>
            <Route path="data">
              <Route
                path="contacts"
                element={
                  <AdminLayout>
                    <Contacts />
                  </AdminLayout>
                }
              />
              <Route
                path="invoices"
                element={
                  <AdminLayout>
                    <Invoices />
                  </AdminLayout>
                }
              />
              <Route
                path="team"
                element={
                  <AdminLayout>
                    <Team />
                  </AdminLayout>
                }
              />
            </Route>
            <Route path="orders/">
              <Route
                index
                element={
                  <AdminLayout>
                    <OrdersListAdmin />
                  </AdminLayout>
                }
              />
              <Route
                path=":orderId"
                element={
                  <AdminLayout>
                    <OrderDetailsAdmin />
                  </AdminLayout>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <AdminLayout>
                    <ProductsListAdmin />
                  </AdminLayout>
                }
              />
              <Route
                path="new"
                element={
                  <AdminLayout>
                    <NewProduct />
                  </AdminLayout>
                }
              />
              <Route
                path=":productId"
                element={
                  <AdminLayout>
                    <ProductDetailsAdmin />
                  </AdminLayout>
                }
              />
            </Route>
            <Route path="customers">
              <Route
                index
                element={
                  <AdminLayout>
                    <CustomersList />
                  </AdminLayout>
                }
              />
              <Route
                path=":customerId"
                element={
                  <AdminLayout>
                    <CustomerDetails />
                  </AdminLayout>
                }
              />
            </Route>
          </Route>
          {/* CUSTOMER SAITE SAITE */}
          <Route path="/">
            <Route
              index
              element={
                <CustomerLayout>
                  <Home />
                </CustomerLayout>
              }
            />
            <Route
              path="shopping"
              element={
                <CustomerLayout>
                  <Shopping />
                </CustomerLayout>
              }
            />
            <Route
              path="product/:productId"
              element={
                <CustomerLayout>
                  <ProductDetailsCustomer />
                </CustomerLayout>
              }
            />
            <Route element={<PrivateRoutes />} path="profile">
              <Route
                index
                element={
                  <CustomerLayout>
                    <Profile />
                  </CustomerLayout>
                }
              />
              <Route path="orders">
                <Route
                  index
                  element={
                    <CustomerLayout>
                      <OrdersListCustomer />
                    </CustomerLayout>
                  }
                />
                <Route
                  path=":orderId"
                  element={
                    <CustomerLayout>
                      <OrderDetailsCustomer />
                    </CustomerLayout>
                  }
                />
              </Route>

              <Route
                path="address"
                element={
                  <CustomerLayout>
                    <Address />
                  </CustomerLayout>
                }
              />
              <Route
                path="wishlist"
                element={
                  <CustomerLayout>
                    <Wishlist />
                  </CustomerLayout>
                }
              />
            </Route>

            <Route element={<PrivateRoutes />} path="checkout">
              <Route
                index
                element={
                  <CustomerLayout>
                    <Checkout />
                  </CustomerLayout>
                }
              />
              <Route
                path="viewcart"
                element={
                  <CustomerLayout>
                    <ViewCart />
                  </CustomerLayout>
                }
              />

              <Route
                path="checkout/success"
                element={
                  <CustomerLayout>
                    <Confirmation />
                  </CustomerLayout>
                }
              />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

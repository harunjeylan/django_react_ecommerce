//IMPORTING LIBRARYS
import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
//IMPORTING APP SETUP
import CustomerPrivateRoutes from "./utils/CustomerPrivateRoutes";
import AdminPrivateRoutes from "./utils/AdminPrivateRoutes";
import { ColorModeContext, useMode } from "./theme";
import AdminLayout from "./site/admin/layout";
import CustomerLayout from "./site/customers/layout";

//IMPORTING ADMIN PAGE COMPONENTS

import Dashboard from "./site/admin/pages/dashboard";
import Team from "./site/admin/pages/team";
import Invoices from "./site/admin/pages/invoices";
import Contacts from "./site/admin/pages/contacts";
import FAQ from "./site/admin/pages/faq";
import { OrdersListAdmin, OrderDetailsAdmin } from "./site/admin/pages/orders";

import ProductsListAdmin from "./site/admin/pages/products/list";
import AddEditProduct from "./site/admin/pages/products/add-edit";
import ProductDetailsAdmin from "./site/admin/pages/products/details";
// IMPORTING Authentication pages

import Login from "./site/auth/pages/Login";
import Register from "./site/auth/pages/Register";

//IMPORTING CUSTOMERS PAGE COMPONENTS

import Home from "./site/customers/pages/home";
import Shopping from "./site/customers/pages/shopping";
import { ProductDetailsCustomer } from "./site/customers/pages/products";
import Page404 from "./components/Page404";
import {
  selectCurrentToken,
  selectCurrentRefresh,
  // selectCurrentUser,
} from "./features/auth/authSlice";
import { useSelector } from "react-redux";
// import {  useDispatch } from "react-redux";
// import { useGetUseDataQuery } from "./features/auth/authApiSlice";
// import { setUserData } from "./features/auth/authSlice";
import { refreshAccessToken } from "./features/auth/authApi";

import store from "./app/store";
import dayjs from "dayjs";
import CustomersList from "./site/admin/pages/customers/list/index";
import NewCustomer from "./site/admin/pages/customers/new/index";
import CustomerDetails from "./site/admin/pages/customers/details/index";
import Profile from "./site/customers/pages/profile/details/index";
import OrdersListCustomer from "./site/customers/pages/profile/orders/List";
import OrderDetailsCustomer from "./site/customers/pages/profile/orders/Details";
import Wishlist from "./site/customers/pages/profile/wishlist/index";
import Checkout from "./site/customers/pages/checkout/checkout/index";
import ViewCart from "./site/customers/pages/checkout/viewcart/index";
import Confirmation from "./site/customers/pages/checkout/confirmation/index";
function App() {
  const [theme, colorMode] = useMode();
  const accessToken = useSelector(selectCurrentToken);
  const refreshToken = useSelector(selectCurrentRefresh);
  // const userData = useSelector(selectCurrentUser);
  // const dispatch = useDispatch();
  // const { data: newUserData } = useGetUseDataQuery();
  // useEffect(() => {
  //   if (userData && newUserData) dispatch(setUserData(newUserData));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [accessToken]);

  const timeOutRef = useRef(1000 * 60 * 4);
  useEffect(() => {
    timeOutRef.current = accessToken
      ? dayjs.unix(jwt_decode(accessToken).exp).diff(dayjs()) - 30000
      : 1000 * 60 * 58;
  }, [accessToken]);

  useEffect(() => {
    let timeOut = timeOutRef.current < 0 ? 3000 : timeOutRef.current;
    let interval = setInterval(() => {
      if (refreshToken) {
        refreshAccessToken(store);
      }
    }, timeOut);
    return () => clearInterval(interval);
  }, [accessToken, refreshToken]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Authentication pages */}

          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route element={<AdminPrivateRoutes />} path="admin">
            <Route
              index
              element={
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              }
            />
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
                    <AddEditProduct />
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
              <Route
                path=":productId/edit"
                element={
                  <AdminLayout>
                    <AddEditProduct isEditing={true} />
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

            <Route element={<CustomerPrivateRoutes />} path="profile">
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
                path="wishlist"
                element={
                  <CustomerLayout>
                    <Wishlist />
                  </CustomerLayout>
                }
              />
            </Route>

            <Route element={<CustomerPrivateRoutes />} path="checkout">
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
                path="success"
                element={
                  <CustomerLayout>
                    <Confirmation />
                  </CustomerLayout>
                }
              />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;

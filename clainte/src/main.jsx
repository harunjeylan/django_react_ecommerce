import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "suneditor/dist/css/suneditor.min.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider, Box, Typography } from "@mui/material";
import store from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { CircularProgress } from "@mui/material";
import { ErrorBoundary } from "./utils/ErrorBoundary";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <ErrorBoundary
            fallback={
              <Box className="w-full h-screen flex justify-center items-center">
                <Typography variant="h1" className="text-4xl font-bold">
                  There is error happen!
                </Typography>
              </Box>
            }
          >
            <Suspense
              fallback={
                <Box className="w-full h-screen flex justify-center items-center">
                  <CircularProgress />
                </Box>
              }
            >
              {" "}
              <PersistGate loading={null} persistor={persistStore(store)}>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </PersistGate>
            </Suspense>
          </ErrorBoundary>
        </SnackbarProvider>
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>
);

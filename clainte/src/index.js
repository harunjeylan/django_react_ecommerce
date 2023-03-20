import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { CircularProgress } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider, Box } from "@mui/material";
import store from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ErrorBoundary } from "./utils/ErrorBoundary";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ErrorBoundary fallback={<h1>There is error happen!</h1>}>
          <Suspense
            fallback={
              <Box className="w-full h-screen flex justify-center items-center">
                <CircularProgress />
              </Box>
            }
          >
            <PersistGate loading={null} persistor={persistStore(store)}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </PersistGate>
          </Suspense>
        </ErrorBoundary>
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>
);

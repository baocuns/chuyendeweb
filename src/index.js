import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutedContent } from "./routes/index";
import AppLayout from "./layout/default";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { CookiesProvider } from "react-cookie";

const root = createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppLayout>
            <RoutedContent />
          </AppLayout>
        </Router>
      </PersistGate>
    </Provider>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

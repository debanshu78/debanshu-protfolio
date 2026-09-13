import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import Routing from "./Routing.jsx";
import "./index.css";
import store from "./state/store";
import { LoginModalProvider } from "./context/LoginModalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LoginModalProvider>
          <Routing />
        </LoginModalProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

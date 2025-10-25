import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import Routing from "./Routing.jsx";
import "./index.css";
import { store } from "./state/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

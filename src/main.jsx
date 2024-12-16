import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Layout/Router.jsx";
import ContextAPI from "./component/ContextAPI/ContextAPI.jsx";
import "./i18n.js";
import { Provider } from "react-redux";
import { persister, store } from "./component/Redux/Store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <ContextAPI>
          <RouterProvider router={router} />
        </ContextAPI>
      </PersistGate>
    </Provider>
    <ToastContainer />
  </StrictMode>
);

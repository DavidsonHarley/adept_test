import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app";
import { Provider } from "react-redux";
import { store } from "../shared/lib/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);

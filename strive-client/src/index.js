import "bootstrap/dist/css/bootstrap.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./_helpers";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ReduxToastr from "react-redux-toastr";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr />
    <App />
  </Provider>,
  rootElement
);

serviceWorker.unregister();

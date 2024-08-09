import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <img
      className="tf-logo"
      alt="tf-logo"
      src="https://www.gstatic.com/devrel-devsite/prod/v8c8ec5f90d3e078ddd668309d42cb633e54798872586821a55652000226f878b/tensorflow/images/lockup.svg"
    />
    <App />
  </React.StrictMode>
);

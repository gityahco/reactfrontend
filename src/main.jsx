import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ContextProvider } from "./context/contextProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <ContextProvider> */}
        <App/>
        asdf
            <RouterProvider router={router} />
        {/* </ContextProvider> */}
    </React.StrictMode>
);

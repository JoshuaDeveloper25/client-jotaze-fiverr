// --> Default React imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom/client";

// --> Styles imports
import CssBaseline from "@mui/material/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// --> React Outer imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// --> Pages
import Root from "./pages/Root";
import LogIn from "./pages/LogIn/LogIn";
import AdminRoot from "./admin/AdminRoot";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        index: true,
        element: <LogIn />,
      },

      {
        path: "/panel-administrador",
        element: <AdminRoot />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  </>
);

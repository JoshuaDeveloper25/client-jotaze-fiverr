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
import { AppProvider } from "./context/AppProvider";

// --> Pages
import Root from "./pages/Root";
import LogIn from "./pages/LogIn/LogIn";
import AdminRoot from "./admin/AdminRoot";
import NewUser from "./admin/pages/NewUser/NewUser";
import Dashboard from "./admin/pages/Dashboard/Dashboard";
import NewClient from "./admin/pages/NewClient/NewClient";
import ClientXService from "./admin/pages/ClientXService/ClientXService";
import ServicesList from "./admin/pages/ServicesList/ServicesList";
import SearchService from "./pages/SearchService/SearchService";
import ConfirmAccount from "./pages/ConfirmAccount/ConfirmAccount";
import RegisterService from "./admin/pages/RegisterService/RegisterService";
import ServicesListClient from "./admin/pages/ServicesListClient/ServicesListClient";
import UsersList from "./admin/pages/UsersList/UsersList";
import ClientList from "./admin/pages/ClientList/ClientList";

import PrivateRoutes from "./auth/PrivateRoutes";
import PublicRoutes from "./auth/PublicRoutes";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        element: <Root />,
        children: [
          {
            index: true,
            element: <LogIn />,
          },

          {
            element: <SearchService />,
            path: "/buscar-servicio",
          },

          {
            element: <NewClient />,
            path: "/nuevo-cliente",
          },

          {
            element: <ConfirmAccount />,
            path: "/confirmaccount/:token",
          },
        ],
      },
    ],
  },

  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/admin",
        element: <AdminRoot />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },

          {
            path: "/admin/nuevo-usuario",
            element: <NewUser />,
          },

          {
            path: "/admin/lista-usuarios",
            element: <UsersList />,
          },

          {
            path: "/admin/nuevo-cliente",
            element: <NewClient />,
          },

          {
            path: "/admin/lista-clientes",
            element: <ClientList />,
          },

          {
            path: "/admin/servicio-cliente",
            element: <ClientXService />,
          },

          {
            path: "/admin/lista-servicios",
            element: <ServicesList />,
          },

          {
            path: "/admin/lista-servicios-cliente",
            element: <ServicesListClient />,
          },

          {
            path: "/admin/registrar-servicio",
            element: <RegisterService />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <CssBaseline />
        <RouterProvider router={router} />
        <ToastContainer stacked position="top-center" />
      </AppProvider>
    </QueryClientProvider>
  </>
);

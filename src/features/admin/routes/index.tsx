import { Navigate, Outlet } from "react-router-dom";
import { AdminHeader } from "../components";

const AdminApp = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminApp />,
    children: [
      { path: "login", element: <>TBD Admin Login</> },
      { path: "home", element: <>TBD Admin Home</> },
      { path: "trade", element: <>TBD Admin Trade</> },
      { path: "asset", element: <>TBD Admin Asset</> },
      { path: "system", element: <>TBD Admin System</> },
      { path: "", element: <Navigate to="home" /> },
      { path: "*", element: <Navigate to="home" /> },
    ],
  },
];

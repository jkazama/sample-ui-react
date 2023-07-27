import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { userRoutes } from "@/features/user/routes";
import { adminRoutes } from "@/features/admin/routes";

export const AppRoutes = () => {
  const commonRoutes: RouteObject[] = [
    { path: "/", element: <Navigate to="/user/login"></Navigate> },
  ];
  const element = useRoutes([...userRoutes, ...adminRoutes, ...commonRoutes]);
  return <>{element}</>;
};

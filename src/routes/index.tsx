import { Layout } from "@/components/layout";
import { AssetHome } from "@/features/asset/components";
import { Dashboard } from "@/features/dashboard/components";
import { TradeHome } from "@/features/trade/components";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "trade", element: <TradeHome /> },
      { path: "asset", element: <AssetHome /> },
      { path: "", element: <Navigate to="dashboard" /> },
      { path: "*", element: <Navigate to="dashboard" /> },
    ],
  },
];

export const AppRoutes = () => {
  const element = useRoutes(routes);
  return <>{element}</>;
};

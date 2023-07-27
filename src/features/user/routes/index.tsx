import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { login, logout } from "@/stores/auth";
import { LoginedKey, LogoutKey, useEventEmitter } from "@/stores/event";
import { Log } from "@/libs/log";
import { logout as logoutServer } from "@/features/common/api/context";
import { Login as UserLogin } from "@/features/common/components/Login";
import { UserAsset, UserHeader, UserHome, UserTrade } from "../components";

const UserApp = () => {
  const event = useEventEmitter();
  useEffect(() => {
    const fnLogined = event.on(LoginedKey, (user) => {
      login(user);
      Log.info(`Login Successed. [${user.roleType}-${user.id}]`);
    });
    const fnLogout = event.on(LogoutKey, async () => {
      await logoutServer();
      logout();
      Log.info("Logout Successed.");
    });
    return () => {
      event.off(LoginedKey, fnLogined);
      event.off(LogoutKey, fnLogout);
    };
  }, []);
  return (
    <>
      <UserHeader />
      <Outlet />
    </>
  );
};

export const userRoutes = [
  {
    path: "/user",
    element: <UserApp />,
    children: [
      { path: "login", element: <UserLogin /> },
      { path: "home", element: <UserHome /> },
      { path: "trade", element: <UserTrade /> },
      { path: "asset", element: <UserAsset /> },
      { path: "", element: <Navigate to="home" /> },
      { path: "*", element: <Navigate to="home" /> },
    ],
  },
];

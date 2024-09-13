import { useAuth } from "@/hooks";
import { LoaderCircle } from "lucide-react";
import { useCallback } from "react";
import { Outlet } from "react-router-dom";
import { Login } from "../auth";
import { AppHeader } from "./AppHeader";

export const Layout = () => {
  const { logined, isLoading } = useAuth();
  const AppBody = useCallback(() => {
    if (!logined && isLoading) {
      return (
        <div className="flex justify-center">
          <LoaderCircle className="animate-spin mt-14" size={32} />
        </div>
      );
    }
    return logined ? <Outlet /> : <Login />;
  }, [logined, isLoading]);
  return (
    <div className="bg-slate-50 h-screen">
      <AppHeader />
      <AppBody />
    </div>
  );
};

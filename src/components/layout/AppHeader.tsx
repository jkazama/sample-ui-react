import { useAuth, useMessage } from "@/hooks";
import { cn } from "@/lib/utils";
import { actorRoleType } from "@/types/i18n";
import {
  Banknote,
  CandlestickChart,
  EllipsisVertical,
  House,
  KeySquare,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const AppHeader = () => {
  const { notify } = useMessage();
  const { logined, user, isAdmin, logout } = useAuth();
  const navStyle = "flex items-center h-8 px-8 space-x-1";
  const handleLogout = async () => {
    await logout();
    notify("Logged out.");
  };
  return (
    <div className="flex w-full justify-between bg-slate-100 shadow text-sm">
      <div className="flex items-center h-8">
        <div className="flex font-brand px-2">
          <ShieldCheck size="18" />
          <span className="ml-1">Sample UI</span>
        </div>
        {logined && (
          <>
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                isActive
                  ? cn(navStyle, "border-b-2 bg-slate-200 border-b-primary/80")
                  : navStyle
              }
            >
              <div className="flex">
                <House size="18" />
                <span className="ml-2">Home</span>
              </div>
            </NavLink>
            <NavLink
              to="trade"
              className={({ isActive }) =>
                isActive
                  ? cn(navStyle, "border-b-2 bg-slate-200 border-b-primary/80")
                  : navStyle
              }
            >
              <div className="flex">
                <CandlestickChart size="18" />
                <span className="ml-2">Trade</span>
              </div>
            </NavLink>
            <NavLink
              to="asset"
              className={({ isActive }) =>
                isActive
                  ? cn(navStyle, "border-b-2 bg-slate-200 border-b-primary/80")
                  : navStyle
              }
            >
              <div className="flex">
                <Banknote size="18" />
                <span className="ml-2">Asset</span>
              </div>
            </NavLink>
          </>
        )}
      </div>
      {logined && (
        <div className="flex items-center space-x-2 px-2">
          <div>
            <Badge variant={"outline"}>{actorRoleType(user.roleType)}</Badge>
          </div>
          <div>{user.name}</div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus-visible:outline-none">
                <EllipsisVertical className="mt-1" size="18" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                  <KeySquare size={18} className="mr-2" />
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  );
};

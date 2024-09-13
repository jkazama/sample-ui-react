import { Log } from "@/lib/log";
import { ActorRoleType, LoginAccount, LoginRequest } from "@/types";
import { useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import * as api from "./api";

const anonymous: LoginAccount = {
  id: "unknown",
  name: "unknown",
  roleType: ActorRoleType.ANONYMOUS,
  authorityIds: [],
};

const QueryKey = "auth";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: QueryKey,
    queryFn: async () => {
      try {
        return await api.loginAccount();
      } catch (e) {
        return anonymous;
      }
    },
    retry: false,
    refetchInterval: 30 * 1000,
  });

  const logined = useMemo(() => {
    return data ? data.roleType != ActorRoleType.ANONYMOUS : false;
  }, [data]);

  const user = useMemo(() => {
    return data || anonymous;
  }, [data]);

  const isStaff = useMemo(() => {
    return user.roleType === ActorRoleType.INTERNAL;
  }, [user]);

  const isAdmin = useMemo(() => {
    return user.roleType === ActorRoleType.ADMINISTRATOR;
  }, [user]);

  const reloadMyUser = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: QueryKey });
    Log.info("Success Reload MyUser.");
  }, []);

  const login = useCallback(async (params: LoginRequest) => {
    await api.login(params);
    Log.info("Success Login.");
    await reloadMyUser();
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } catch (e) {
      // nothing.
    }
    await queryClient.invalidateQueries({ queryKey: QueryKey });
    Log.info("Success Logout.");
  }, [queryClient]);

  return {
    logined,
    user,
    isStaff,
    isAdmin,
    reloadMyUser,
    isLoading,
    login,
    logout,
  };
};

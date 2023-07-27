import { useAxios } from "@/libs/axios";
import { LoginAccount } from "../types";

export type LoginRequest = {
  loginId: string;
  password: string;
};

export const login = (req: LoginRequest): Promise<void> => {
  return useAxios().postForm("/login", req);
};

export const logout = (): Promise<void> => {
  return useAxios().postForm("/logout");
};

export const loginStatus = (): Promise<void> => {
  return useAxios().get("/loginStatus");
};

export const loginAccount = (): Promise<LoginAccount> => {
  return useAxios().get("/loginAccount");
};

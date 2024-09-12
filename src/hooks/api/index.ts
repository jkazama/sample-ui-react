import { axios } from "@/lib/axios";
import { LoginAccount, LoginRequest } from "@/types";

export const login = (req: LoginRequest): Promise<void> => {
  return axios.postForm("/login", req);
};

export const logout = (): Promise<void> => {
  return axios.postForm("/logout");
};

export const loginAccount = (): Promise<LoginAccount> => {
  return axios.get("/loginAccount");
};

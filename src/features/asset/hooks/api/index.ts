import { axios } from "@/lib/axios";
import { UserCashOut, UserRegCashOut } from "../../types";

export const findUnprocessedCashOut = (): Promise<UserCashOut[]> => {
  return axios.get("/asset/cio/unprocessedOut");
};

export const withdraw = (params: UserRegCashOut): Promise<UserCashOut> => {
  return axios.post("/asset/cio/withdraw", params);
};

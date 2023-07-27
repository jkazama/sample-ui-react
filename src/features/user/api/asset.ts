import { useAxios } from "@/libs/axios";
import { UserRegCashOut, UserCashOut } from "../types/asset";

export const findUnprocessedCashOut = (): Promise<UserCashOut[]> => {
  return useAxios().get("/asset/cio/unprocessedOut");
};

export const withdraw = (req: UserRegCashOut): Promise<void> => {
  return useAxios().post("/asset/cio/withdraw", req);
};

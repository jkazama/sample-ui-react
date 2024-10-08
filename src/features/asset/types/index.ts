import { ActionStatusType } from "@/types";

export type UserCashOut = {
  cashInOutId: string;
  currency: string;
  absAmount: number;
  requestDay: string;
  requestDate: string;
  eventDay: string;
  valueDay: string;
  statusType: ActionStatusType;
  updateDate: string;
  cashflowId: number;
};

export type UserRegCashOut = {
  currency: string;
  absAmount: number;
};

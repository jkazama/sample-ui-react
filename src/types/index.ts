import { Level } from "@/lib/log";

export type MessageGlobal = {
  message: string;
  level: Level;
};

export type MessageColumn = {
  field: string;
  message: string;
};

export type WebRequestError = {
  name: string;
  message: string;
  stack?: string;
  statusCode?: number;
  statusText?: string;
  // List of warnings set when statusCode is 400.
  warnings?: MessageColumn[];
};

export const isWebRequestError = (payload: any): payload is WebRequestError => {
  return (payload as WebRequestError).name !== undefined;
};

export type Warn = {
  field: string;
  message: string;
  messageArgs: string[];
};

export type ImportCsvResult = {
  count: number;
  result: boolean;
  errors: ImportRowError[];
};

export type ImportRowError = {
  lineNumber: number;
  colErrors: Warn[];
};

export const ActorRoleType = {
  ANONYMOUS: "ANONYMOUS",
  USER: "USER",
  INTERNAL: "INTERNAL",
  ADMINISTRATOR: "ADMINISTRATOR",
} as const;
export type ActorRoleType = (typeof ActorRoleType)[keyof typeof ActorRoleType];

export const ActionStatusType = {
  UNPROCESSED: "UNPROCESSED",
  PROCESSING: "PROCESSING",
  PROCESSED: "PROCESSED",
  CANCELLED: "CANCELLED",
  ERROR: "ERROR",
};
export type ActionStatusType =
  (typeof ActionStatusType)[keyof typeof ActionStatusType];

export type LoginAccount = {
  id: string;
  name: string;
  roleType: ActorRoleType;
  authorityIds: string[];
};

export type LoginRequest = {
  loginId: string;
  password: string;
};

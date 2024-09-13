import { WebRequestError } from "@/types";
import Axios, { AxiosError } from "axios";
import { Log } from "./log";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_APP_API_ROOT,
  headers: {
    common: {
      Expires: -1,
      "Cache-Control": "no-cache,no-store,must-revalidate,max-age=-1,private",
    },
  },
  withCredentials: true,
  withXSRFToken: true,
});
axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err: AxiosError) => {
    let error: WebRequestError = {
      name: err.name,
      message: err.message,
      stack: err.stack,
      statusCode: err.response?.status,
      statusText: err.response?.statusText,
      warnings: undefined,
    };
    if (error.statusCode) {
      Log.warn(
        "[" + error.statusCode + "] " + (error.statusText || "empty statusText")
      );
      switch (error.statusCode) {
        case 0:
          Log.error("No host was found to connect to.");
          break;
        case 200:
          Log.error(
            "Failed to parse the return value, please check if the response is returned in JSON format"
          );
          break;
        case 400:
          if (err.response?.data) {
            Log.warn(err.response.data);
            const warns = err.response.data as Record<string, string[]>;
            const globalMessage = warns[""] || ["Please confirm your input."];
            error.message = globalMessage[0];
            error.warnings = Object.keys(warns).map((field) => {
              const messages = warns[field];
              return {
                field,
                message:
                  messages && 0 < messages.length ? messages[0] : "Unknown",
              };
            });
          }
          break;
        case 401:
        case 403:
          Log.warn("You do not have permission to execute the api.");
          break;
        default:
          Log.error(err.response?.data);
      }
    } else {
      Log.error(err);
    }
    return Promise.reject(error);
  }
);
export { axios };

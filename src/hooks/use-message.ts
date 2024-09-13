import { useToast } from "@/components/ui/use-toast";
import { Level } from "@/lib/log";
import { MessageColumn, isWebRequestError } from "@/types";
import { useCallback } from "react";

export const useMessage = () => {
  const { toast } = useToast();
  const notify = useCallback(
    (message: string, level: Level = Level.INFO): void => {
      if (!message) {
        return;
      }
      toast({
        description: message,
        variant: lookupVariant(level),
      });
    },
    []
  );

  const lookupVariant = (level: Level) => {
    switch (level) {
      case Level.INFO:
        return "success";
      case Level.WARN:
        return "warning";
      case Level.ERROR:
        return "destructive";
      default:
        return "default";
    }
  };

  const notifySimple = (message: string) => notify(message, Level.DEBUG);

  const notifyWarning = (message: string) => notify(message, Level.WARN);

  const notifyError = (message: string) => notify(message, Level.ERROR);

  const handleError = (e: unknown): MessageColumn[] => {
    if (isWebRequestError(e)) {
      switch (e.statusCode) {
        case 400:
        case 401:
        case 403:
          notify(e.message, Level.WARN);
          break;
        default:
          notify(e.message, Level.ERROR);
      }
      if (e.warnings) {
        return e.warnings;
      }
    }
    return [];
  };

  return {
    notify,
    notifySimple,
    notifyWarning,
    notifyError,
    handleError,
  };
};

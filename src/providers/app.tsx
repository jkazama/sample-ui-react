import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { RotateCcw } from "lucide-react";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HashRouter as Router } from "react-router-dom";
import { QueryProvider } from "./query";

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold mb-2">
        Ooops, something went wrong
      </h2>
      <Button onClick={() => window.location.assign(window.location.origin)}>
        Reload
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: ReactNode;
};
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <RotateCcw className="animate-spin" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryProvider>
          <Router>
            <div>{children}</div>
            <Toaster />
          </Router>
        </QueryProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

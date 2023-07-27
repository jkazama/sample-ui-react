import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Button } from "@/components/elements/button";

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: ReactNode;
};
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <RecoilRoot>
          <Router>{children}</Router>
        </RecoilRoot>
      </ErrorBoundary>
    </Suspense>
  );
};

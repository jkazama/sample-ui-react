import { Log } from "@/lib/log";
import { useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import { UserRegCashOut } from "../types";
import * as api from "./api";

const QueryKeyCashOutsUnprocessed = "cashOutsUnprocessed";

export const useAsset = () => {
  const queryClient = useQueryClient();

  const {
    data: dataCashOutsUnprocessed,
    isLoading: isLoadingCashOutsUnprocessed,
  } = useQuery({
    queryKey: QueryKeyCashOutsUnprocessed,
    queryFn: api.findUnprocessedCashOut,
    refetchInterval: false,
    onSuccess: (cashOuts) => {
      Log.info(`Loaded cashOutsUnprocessed. count: ${cashOuts.length}`);
    },
  });

  const cashOutsUnprocessed = useMemo(() => {
    return dataCashOutsUnprocessed || [];
  }, [dataCashOutsUnprocessed]);

  const reloadCashOutsUnprocessed = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: QueryKeyCashOutsUnprocessed,
    });
  }, [queryClient]);

  const withdraw = useCallback(async (params: UserRegCashOut) => {
    const result = await api.withdraw(params);
    Log.info(
      `Withdrawal request completed. ${params.currency} ${params.absAmount}`
    );
    await reloadCashOutsUnprocessed();
    return result;
  }, []);

  return {
    cashOutsUnprocessed,
    isLoadingCashOutsUnprocessed,
    withdraw,
  };
};

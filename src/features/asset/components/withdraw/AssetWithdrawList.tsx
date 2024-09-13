import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDay } from "@/lib/date";
import { formatAmount } from "@/lib/format";
import { cn } from "@/lib/utils";
import { actionStatusTypeStr } from "@/types/i18n";
import { LoaderCircle } from "lucide-react";
import { useAsset } from "../../hooks";

export const AssetWithdrawList = ({ className }: { className?: string }) => {
  const { cashOutsUnprocessed, isLoadingCashOutsUnprocessed } = useAsset();

  return (
    <ScrollArea
      className={cn("bg-slate-50 rounded-sm whitespace-nowrap", className)}
    >
      {!isLoadingCashOutsUnprocessed ? (
        0 < cashOutsUnprocessed.length ? (
          <Table className="w-max bg-white">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Request Day</TableHead>
                <TableHead className="text-center">Delivery Day</TableHead>
                <TableHead className="text-right min-w-[100px]">
                  Amount
                </TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cashOutsUnprocessed.map((cashOut) => (
                <TableRow key={cashOut.cashInOutId}>
                  <TableCell className="text-center">
                    {formatDay(cashOut.requestDay)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDay(cashOut.valueDay)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatAmount(cashOut.absAmount)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={"information"}>
                      {actionStatusTypeStr(cashOut.statusType)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableFoot colSpan={4}>
                  結果 {cashOutsUnprocessed.length} 件
                </TableFoot>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <div className="flex items-center p-2 text-gray-500">
            <span>情報が登録されていません</span>
          </div>
        )
      ) : (
        <div className="flex items-center p-2 text-gray-500">
          <LoaderCircle className="animate-spin mr-2" size={18} />
          <span>現在情報を読み込みしています</span>
        </div>
      )}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

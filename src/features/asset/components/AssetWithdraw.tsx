import { cn } from "@/lib/utils";
import { AssetWithdrawList } from "./withdraw/AssetWithdrawList";
import { AssetWithdrawRegister } from "./withdraw/AssetWithdrawRegister";

export const AssetWithdraw = ({ className }: { className?: string }) => {
  return (
    <div className={cn("p-2 h-[calc(100vh-80px)] space-y-2", className)}>
      <AssetWithdrawRegister className="w-[400px]" />
      <AssetWithdrawList className="w-[800px] h-[calc(100vh-180px)]" />
    </div>
  );
};

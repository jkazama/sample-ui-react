import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, Landmark, NotebookText } from "lucide-react";
import { useState } from "react";
import { AssetDeposit } from "./AssetDeposit";

export const AssetHome = () => {
  const [tabIndex, setTabIndex] = useState("cashflow");
  return (
    <div className="p-2">
      <Tabs value={tabIndex} onValueChange={setTabIndex}>
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="cashflow">
            <NotebookText size={14} className="mr-2" />
            Cashflow
          </TabsTrigger>
          <TabsTrigger value="deposit">
            <Coins size={14} className="mr-2" />
            Deposit
          </TabsTrigger>
          <TabsTrigger value="withdraw">
            <Landmark size={14} className="mr-2" />
            Withdraw
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cashflow">TBD: Cashflow</TabsContent>
        <TabsContent value="deposit">
          <AssetDeposit />
        </TabsContent>
        <TabsContent value="withdraw">TBD: Withdraw</TabsContent>
      </Tabs>
    </div>
  );
};

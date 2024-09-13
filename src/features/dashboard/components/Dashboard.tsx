import { Card, CardContent } from "@/components/ui/card";

export const Dashboard = () => {
  return (
    <div className="flex gap-2 p-2">
      <div className="w-[300px]">
        <Card>
          <CardContent className="h-[calc(100vh-50px)] text-gray-400">
            Product List Area
          </CardContent>
        </Card>
      </div>
      <div className="w-[900px] grid grid-cols-2 auto-rows-min gap-2">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="h-[200px] text-gray-400">
              Dashboard Content {i + 1}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

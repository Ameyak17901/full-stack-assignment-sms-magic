import { Calendar, CircleQuestionMark, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DataTable } from "../data-table";
import { columns, DashboardData } from "@/constants/dashboard-data";
import { useState } from "react";
import DashboardCalendarView from "./dashboard-calendar-view";

const Dashboard = () => {
  const [viewType, setViewType] = useState<"chart" | "calendar">("chart");

  return (
    <div className="flex flex-col w-full px-2 item-center space-y-10 ">
      <div className="flex w-full justify-between px-3 mt-3">
        <div className="space-x-2">
          <p className="text-2xl font-semibold">Campaign</p>
          <p className="text-sm">
            Automate your customer journey with pre built receipes
          </p>
        </div>
        <div className="flex justify-end gap-x-4">
          <div>
            <ToggleGroup type="single" variant="outline">
              <ToggleGroupItem
                value="Tabular"
                onClick={() => {
                  console.log(viewType);
                  setViewType("chart");
                }}
              >
                <List size={40} />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Calendar"
                onClick={() => {
                  console.log(viewType);
                  setViewType("calendar");
                }}
              >
                <Calendar size={40} />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div>
            <ToggleGroup type="single" variant="outline">
              <ToggleGroupItem value="Tabular">
                <CircleQuestionMark size={40} color="var(--muted-foreground)" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Button
            variant="default"
            className="bg-blue-500 hover:bg-blue-500/80"
          >
            Create Campaign
          </Button>
        </div>
      </div>
      <div className="px-3">
        {viewType === "chart" ? (
          <DataTable columns={columns} data={DashboardData} />
        ) : (
          <DashboardCalendarView />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

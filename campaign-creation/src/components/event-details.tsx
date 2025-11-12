import { Clock, MessageCircle } from "lucide-react";

import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import {
  DashboardData,
  getBadgeColor,
  type EventDataType,
} from "@/constants/dashboard-data";
import { useParams } from "react-router-dom";
import { Separator } from "./ui/separator";
import DataChart from "./dashboard/data-chart";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

const EventDetails = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState<EventDataType | undefined>(() =>
    DashboardData.find((item) => item.id === id)
  );

  useEffect(() => {
    setEventData(() => DashboardData.find((item) => item.id === id));
  }, [id]);

  return (
    <div className="flex flex-col gap-y-5 mx-3 min-h-screen">
      <div className="flex mx-3 gap-x-2">
        <h3 className="text-3xl font-semibold">Upcoming Sale</h3>
        <Badge
          variant="outline"
          className={cn("min-w-20", getBadgeColor(eventData?.status ?? ""))}
        >
          {eventData?.status}
        </Badge>
      </div>
      <Separator />
      <div className="bg-green-100 w-fit p-2 rounded-md">
        <span className="text-sm font-sans font-normal">
          Out of <span className="font-semibold">15,017</span> we have found{" "}
          <span className="font-semibold">14,017</span> valid numbers!
        </span>
      </div>
      <Card className="flex max-w-[70%]">
        <CardContent>
          <div className="flex justify-between">
            <DataChart />
            <div className="grid grid-cols-2 gap-y-3">
              <div className="border-l-2 border-muted p-1 gap-y-2">
                <p className="text-sm font-normal">Valid Number</p>
                <p className="text-xl font-semibold">67%</p>
              </div>
              <div className="border-l-2 border-muted p-1 gap-y-2">
                <p className="text-sm font-normal">Invalid Number</p>
                <p className="text-xl font-semibold">500</p>
              </div>
              <div className="border-l-2 border-muted p-1 gap-y-2">
                <p className="text-sm font-normal">Opt-out</p>
                <p className="text-xl font-semibold">13%</p>
              </div>
              <div className="border-l-2 border-muted p-1 gap-y-2">
                <p className="text-sm font-normal">Response rate</p>
                <p className="text-xl font-semibold">11.35%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Separator orientation="horizontal" decorative className="max-w-[80%]" />
      <div className="flex flex-col gap-y-4 mx-1">
        <p className="font-medium">
          Campaign description : End of season sale of 2024
        </p>
        <div className="flex gap-x-3 border rounded bg-accent w-fit p-3">
          <div className="flex flex-col border-r gap-y-1 px-1">
            <p className="text-sm text-muted-foreground">Total Recepients</p>
            <p className="font-semibold">15,017</p>
          </div>
          <div className="flex flex-col border-r gap-y-1 px-1">
            <p className="text-sm text-muted-foreground">Campaign Type</p>
            <p className="font-semibold">Broadcast</p>
          </div>
          <div className="flex flex-col border-r gap-y-1 px-1">
            <p className="text-sm text-muted-foreground">Channel</p>
            <p className="font-semibold flex gap-x-0.5 items-center">
              <MessageCircle size={20} />
              WhatsApp
            </p>
          </div>
          <div className="flex flex-col border-r gap-y-1 px-1">
            <p className="text-sm text-muted-foreground">Sender ID</p>
            <p className="font-semibold">98181928198</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-muted-foreground">
              Total credits consumed
            </p>
            <p className="font-semibold">20,000</p>
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" decorative className="max-w-[80%]" />
      <div className="flex flex-col gap-y-2 mx-1">
        <h3 className="font-semibold">To</h3>
        <div className="gap-x-3 flex">
          <div>
            <p className="text-muted-foreground">Leads</p>
            <p className="font-medium text-sm">Contact</p>
          </div>
          <div>
            <p className="text-muted-foreground">List</p>
            <p className="font-medium text-sm">Phone field</p>
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" decorative className="max-w-[80%]" />
      <div className="flex flex-col gap-y-2 mx-1">
        <h3 className="font-semibold">Compliance Setting</h3>
        <p className="text-sm font-medium">Send only to Opted-in numbers</p>
      </div>
      <Separator orientation="horizontal" decorative className="max-w-[80%]" />
      <div className="flex flex-col gap-y-2 mx-1">
        <h3 className="font-semibold">When</h3>
        <span className="text-sm font-normal flex gap-x-1 p-2 border border-green-300 w-fit bg-green-100 rounded-md">
          <Clock size={20} />
          <p className="font-normal">
            The message sent on {"  "}
            <span className="font-medium">
              Jan 23, 2024 at 12:00 pm, Pacific Standard Time
            </span>
          </p>
        </span>
      </div>
    </div>
  );
};

export default EventDetails;

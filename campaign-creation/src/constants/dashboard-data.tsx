import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { Clock10, ClockFading, Megaphone, MoreVertical } from "lucide-react";

export type EventDataType = {
  id: string;
  campaignName: string;
  message: string;
  recepientSource: string;
  noOfRecepients: number;
  status: "Approval Pending" | "Draft" | "Scheduled" | "Aborted" | "OnGoing";
  createdOn: Date;
};

export type CalendarDataType = {
  id: string;
  start: Date;
  end: Date;
  title: string;
};

export const DashboardData: EventDataType[] = [
  {
    id: "1",
    campaignName: "Help enter guided conversation",
    message:
      "Hey there, this is Soham from SMS Magic would like to start the campaign",
    recepientSource: "SaaS",
    noOfRecepients: 2,
    status: "Approval Pending",
    createdOn: new Date("05 Nov 2025"),
  },
  {
    id: "2",
    campaignName: "Help enter guided conversation",
    message:
      "Hey there, this is Sunil from XYZ Pvt. Ltd would like to abort the campaign",
    recepientSource: "SaaS",
    noOfRecepients: 4,
    status: "Aborted",
    createdOn: new Date("10 Nov 2025"),
  },
  {
    id: "3",
    campaignName: "Help enter guided conversation",
    message:
      "Hey there, this is Samruddhi from ABC Pvt. Ltd, would like to start the campaign",
    recepientSource: "SaaS",
    noOfRecepients: 8,
    status: "Draft",
    createdOn: new Date("22 Nov 2025"),
  },
  {
    id: "4",
    campaignName: "Help enter guided conversation",
    message:
      "Hey there, this is Soham from Mica Consulting Pvt. Ltd regarding the campaign scheduled",
    recepientSource: "SaaS",
    noOfRecepients: 10,
    status: "Scheduled",
    createdOn: new Date("01 Nov 2025"),
  },
  {
    id: "5",
    campaignName: "Help enter guided conversation",
    message:
      "Hey there, Thank you for signing in with SMS-Magic. You have been added to our subscription list and now be among the first new arrivals, big events and special offers.",
    recepientSource: "SaaS",
    noOfRecepients: 10,
    status: "OnGoing",
    createdOn: new Date("01 Dec 2025"),
  },
];

export const calendarData = DashboardData.map((item) => {
  return {
    id: item.id,
    title: item.campaignName,
    start: item.createdOn,
    end: item.createdOn,
  };
});

export const columns: ColumnDef<EventDataType>[] = [
  {
    accessorKey: "campaignName",
    header: "Campaign Name",
    cell: ({ row }) => {
      const campaignName = row.original.campaignName;
      const Icon = getIcon(row.original.status);

      return (
        <div className="flex gap-x-1">
          {Icon && Icon}
          {campaignName}
        </div>
      );
    },
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message =
        row.original.message.length > 45
          ? row.original.message.slice(0, 45) + "..."
          : row.original.message;
      console.log(message);
      return message;
    },
  },
  {
    accessorKey: "recepientSource",
    header: "Recepient's Source",
  },
  {
    accessorKey: "noOfRecepients",
    header: "No. of Recepients",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const className = getBadgeColor(status);

      return <Badge className={className}>{status}</Badge>;
    },
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
    cell: ({ row }) => {
      const date = row.original.createdOn;

      return Intl.DateTimeFormat("EN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Rerun Campaign</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const getIcon = (status: string) => {
  const statusIconMap = [
    { status: "Approval Pending", icon: <Megaphone /> },
    { status: "Draft", icon: <ClockFading /> },
    { status: "Scheduled", icon: <Clock10 /> },
    { status: "Aborted", icon: <Clock10 /> },
    { status: "OnGoing", icon: <Clock10 /> },
  ];

  const Icon = statusIconMap.find((item) => item.status === status)?.icon;

  return Icon;
};

export const getBadgeColor = (status: string) => {
  const statusBadgeColorMap = [
    { status: "Approval Pending", color: "bg-yellow-100 text-yellow-500" },
    { status: "Scheduled", color: "bg-blue-100 text-blue-500" },
    { status: "Aborted", color: "bg-red-100 text-red-500" },
    { status: "OnGoing", color: "bg-orange-100 text-orange-500" },
    { status: "Draft", color: "bg-slate-100 text-slate-500" },
  ];

  const className = statusBadgeColorMap.find(
    (item) => item.status === status
  )?.color;
  return className;
};

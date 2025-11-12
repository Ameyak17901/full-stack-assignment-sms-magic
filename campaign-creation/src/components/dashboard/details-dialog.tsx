import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DashboardData,
  getBadgeColor,
  type CalendarDataType,
} from "@/constants/dashboard-data";
import { Badge } from "../ui/badge";

import image from "@/assets/meet-image.jpg";
import { cn } from "@/lib/utils";

interface DetailsDialogProps {
  event: CalendarDataType;
  id: string;
}

const DetailsDialog = ({ event }: DetailsDialogProps) => {
  const data = DashboardData.find((item) => item.id === event.id);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {data && (
            <Badge variant="outline" className={cn(getBadgeColor(data.status), "text-sm font-normal")}>
              {data.status}
            </Badge>
          )}
        </DialogTitle>
        <DialogDescription className="text-2xl font-semibold">
          Event Details
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <img src={image} height={200} width={200} className="rounded-md" />
        <p className="text-md font-normal">{data?.message}</p>
      </div>
    </DialogContent>
  );
};

export default DetailsDialog;

import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Calendar,

  momentLocalizer,
  Views,
  type View,
} from "react-big-calendar";
import moment from "moment";
import {
  calendarData,
  type CalendarDataType,
} from "@/constants/dashboard-data";
import { Card, CardContent } from "../ui/card";

import { useState } from "react";
import { Dialog } from "../ui/dialog";
import DetailsDialog from "./details-dialog";

const localizer = momentLocalizer(moment);

const DashboardCalendarView = () => {
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarDataType | null>(
    null
  );
  const [selectedId, setSelectedId] = useState<string>("1");
  //   const [data, setData] = useState<EventDataType | undefined>(() =>
  //     DashboardData.find((item) => item.id === id)
  //   );

  const handleSelectEvent = (event: CalendarDataType) => {
    const { id } = event;
    setSelectedId(id);
    setSelectedEvent(event);
  };

  const handleDialogClose = () => {
    setSelectedEvent(null);
  };

  return (
    <Card className="min-h-[300px]">
      <CardContent>
        <Calendar
          localizer={localizer}
          events={calendarData}
          startAccessor={"start"}
          endAccessor={"end"}
          style={{ height: 650 }}
          views={{ month: true, week: true, day: true }}
          date={date}
          onSelectEvent={handleSelectEvent}
          popup
          selectable
          onNavigate={(newDate) => setDate(newDate)}
          view={view}
          onView={(view) => setView(view)}
        />
        <Dialog open={!!selectedEvent} onOpenChange={handleDialogClose}>
          {selectedEvent && (
            <DetailsDialog event={selectedEvent} id={selectedId} />
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default DashboardCalendarView;

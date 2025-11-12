import { SidebarTrigger } from "@/components/ui/sidebar";
import { CircleQuestionMark, CircleUser, Wallet } from "lucide-react";
import { Separator } from "./ui/separator";

const Navbar = () => {
  return (
    <div className="gap-y-4">
      <div className="flex justify-between items-center w-full min-h-15 p-1">
        <div className="min-h-5">
          <SidebarTrigger />
        </div>
        <div className="flex  gap-x-10 px-4 ">
          <CircleQuestionMark size={26} color="var(--muted-foreground)" />
          <Wallet size={26} color="var(--muted-foreground)" />
          <div className="flex space-x-1 ">
            <CircleUser
              size={26}
              absoluteStrokeWidth
              color="var(--muted-foreground)"
            />
            <div className="flex flex-col items-center">
              <p className="text-xs font-medium">Admin</p>
              <p className="text-xs font-medium">Ameya</p>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Navbar;

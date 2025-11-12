import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
// import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MessagesSquare } from "lucide-react";

import { items } from "@/constants/sidebar";

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex place-items-center">
        <MessagesSquare
          size={37}
          fill="#4b6fdd"
          color="#4b6fdd"
          absoluteStrokeWidth
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className="hover:bg-sidebar-accent/10 active:bg-sidebar-accent/10">
                  {item.icon && (
                    <item.icon
                      size={30}
                      color="var(--sidebar-primary-foreground)"
                    />
                  )}
                  <span className="text-sidebar-primary-foreground">
                    {item.title}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

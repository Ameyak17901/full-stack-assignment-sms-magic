import { Home, LayoutPanelLeft, Megaphone, UserCircle } from "lucide-react";

export const items = [
  {
    title: "Home",
    href: "/home",
    icon: Home,
    isActive: true,
  },
  {
    title: "Account",
    href: "/account",
    icon: UserCircle,
    isActive: false,
  },
  {
    title: "Announcements",
    href: "/announcements",
    icon: Megaphone,
    isActive: false,
  },
  {
    title: "Layouts",
    href: "/layouts",
    icon: LayoutPanelLeft,
    isActive: false,
  },
];

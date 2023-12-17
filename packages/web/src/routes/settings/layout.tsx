import { Outlet, useNavigation } from "react-router-dom";
import {
  DashboardHeader,
  DashboardHeaderSubTitle,
  DashboardHeaderTitle,
} from "../root";
import { SidebarNav } from "@/components/sidebar-nav";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const sidebarNavItems = [
  {
    title: "Countries",
    href: "/settings/countries",
  },
  {
    title: "Account",
    href: "/settings/forms/account",
  },
  {
    title: "Appearance",
    href: "/settings/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/forms/notifications",
  },
  {
    title: "Display",
    href: "/settings/forms/display",
  },
];

export default function SettingsLayout() {
  const navigation = useNavigation();

  return (
    <>
      <DashboardHeader variant="withSubTitle">
        <DashboardHeaderTitle>Settings</DashboardHeaderTitle>
        <DashboardHeaderSubTitle>
          Manage your account settings and set e-mail preferences.
        </DashboardHeaderSubTitle>
      </DashboardHeader>

      <Separator />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div
          className={cn(
            "flex-1 lg:max-w-2xl",
            navigation.state === "loading" && "opacity-25 transition-opacity"
          )}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}

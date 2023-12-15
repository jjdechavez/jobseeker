import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex overflow-x-scroll space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "ghost" }),
              "hover:bg-transparent hover:underline justify-start",
              isActive && "bg-muted hover:bg-muted"
            )
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}

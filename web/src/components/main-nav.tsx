import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const navLinks = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/settings/countries",
    name: "Settings",
  },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navLinks.map((nav) => (
        <NavLink
          key={nav.name}
          to={nav.path}
          className={({ isActive }) =>
            cn(
              "text-sm font-medium transition-colors hover:text-primary",
              !isActive && "text-muted-foreground"
            )
          }
        >
          {nav.name}
        </NavLink>
      ))}
    </nav>
  );
}

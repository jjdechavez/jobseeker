import * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export default function RootPage() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Dashboard />
      <Toaster />
    </ThemeProvider>
  );
}

export function Dashboard() {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}

const dashboardHeaderVariants = cva("", {
  variants: {
    variant: {
      default: "flex items-center justify-between space-y-2",
      withSubTitle: "space-y-0.5",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface DashboardHeaderProps
  extends React.ButtonHTMLAttributes<HTMLElement>,
    VariantProps<typeof dashboardHeaderVariants> {}

const DashboardHeader = React.forwardRef<HTMLElement, DashboardHeaderProps>(
  ({ className, variant, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(dashboardHeaderVariants({ variant, className }))}
      {...props}
    />
  )
);
DashboardHeader.displayName = "DashboardHeader";

const DashboardHeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-3xl font-bold tracking-tight", className)}
    {...props}
  />
));
DashboardHeaderTitle.displayName = "DashboardHeaderTitle";

const DashboardHeaderSubTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-muted-foreground", className)} {...props} />
));
DashboardHeaderSubTitle.displayName = "DashboardHeaderSubTitle";

const DashboardContent = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => (
  <main ref={ref} className={cn("", className)} {...props}>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{children}</div>
  </main>
));
DashboardContent.displayName = "DashboardContent";

export {
  DashboardHeader,
  DashboardHeaderTitle,
  DashboardHeaderSubTitle,
  DashboardContent,
};

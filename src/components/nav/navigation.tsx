import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/libs/utils";

const Nav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn(
      "relative z-10 flex w-full px-3 py-2 border-b items-center",
      className
    )}
    {...props}
  >
    {children}
  </nav>
));
Nav.displayName = "Nav";

const Brand = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xl font-semibold tracking-tight", className)}
    {...props}
  />
));
Brand.displayName = "Brand";

const NavMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, children, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "group flex list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  >
    {children}
  </ul>
));
NavMenu.displayName = "NavMenu";

const NavLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, to, children, ...props }, ref) => (
  <Link
    ref={ref}
    className={cn(
      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
      className
    )}
    to={to}
    {...props}
  >
    {children}
  </Link>
));
NavLink.displayName = "NavLink";

export { Nav, Brand, NavMenu, NavLink };

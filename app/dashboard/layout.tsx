"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const activeRouteStyle = (currentRoute: string) => {
    const countRoute = pathname.split("/").length - 1;
    const color =  pathname.split("/")[countRoute].includes(currentRoute)
      ? "text-white"
      : "text-sky-300";
    return `${color} text-sm`
  };

  return (
    <>
      <NavigationMenu className="py-4 px-5 bg-sky-700">
        <NavigationMenuList className="flex gap-3">
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={activeRouteStyle("dashboard")}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dashboard/settings" legacyBehavior passHref>
              <NavigationMenuLink className={activeRouteStyle("settings")}>
                Settings
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dashboard/users" legacyBehavior passHref>
              <NavigationMenuLink className={activeRouteStyle("users")}>
                Users
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="py-3 px-5">{children}</div>
    </>
  );
}

export default Layout;

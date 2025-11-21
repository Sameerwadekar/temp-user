"use client";
import * as React from "react";
import { useEffect, useState, useRef, useId } from "react";
import {
  CircleUserRound,
  Gift,
  House,
  SearchIcon,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LogoImg from "@/assets/tempStation_logo.png";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DropdownMenuDialog } from "./DropDown";
import { Link, Links, useNavigate } from "react-router-dom";


// Simple logo component for the navbar
const Logo = () => {
  return (
    <img
      src={LogoImg}
      alt="TempStation Logo"
      className="w-8 h-8 object-contain"
    />
  );
};

// Default navigation links
const defaultNavigationLinks = [
  { href: "#", label: "Home",path:"/" },
  { href: "#", label: "Menu",path:"/menu" },
  { href: "#", label: "Special Offers" },
];

export const Navbar04 = React.forwardRef(
  (
    {
      className,
      logo = <Logo />,
      logoHref = "#",
      navigationLinks = defaultNavigationLinks,
      signInText = "Sign In",
      signInHref = "#signin",
      cartText = "Cart",
      cartHref = "#cart",
      cartCount = 2,
      searchPlaceholder = "Search...",
      onSignInClick,
      onCartClick,
      onSearchSubmit,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    const searchId = useId();

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768); // 768px is md breakpoint
        }
      };

      checkWidth();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    // Combine refs
    const combinedRef = React.useCallback(
      (node) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const query = formData.get("search");
      if (onSearchSubmit) {
        onSearchSubmit(query);
      }
    };

    const navigate = useNavigate();

    return (
      <>
        <header
          ref={combinedRef}
          className={cn(
            "sticky top-0 z-50 w-full border-b bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/30 px-4 md:px-6 [&_*]:no-underline",
            className
          )}
          {...props}
        >
          <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
            {/* Left side */}
            <div className="flex flex-1 items-center gap-2 ">
              {/* Main nav */}
              <div className="flex flex-1 items-center gap-6 max-md:justify-between">
                <button className="flex items-center">
                  <img
                    src={LogoImg}
                    style={{ height: "150px", weight: "300px" }}
                    alt="Logo"
                  />
                </button>
              </div>
            </div>
            {/* CENTER: Navigation + Search */}
            <div className="flex flex-1 items-center  gap-6">
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium transition-colors cursor-pointer group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          <Link to={link.path}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}

              <form
                onSubmit={handleSearchSubmit}
                className="relative md:hidden"
              >
                <Input
                  id={searchId}
                  name="search"
                  className="peer h-8 ps-8 pe-2"
                  placeholder={searchPlaceholder}
                  type="search"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                  <SearchIcon size={16} />
                </div>
              </form>
            </div>
            {/* Right side */}
            {!isMobile && (
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  className="text-sm font-medium px-4 h-9 rounded-md shadow-sm cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onCartClick) onCartClick();
                  }}
                >
                  <ShoppingCart />
                </Button>
                <Button size="sm" asChild  className="text-sm font-medium px-4 h-9 rounded-md shadow-sm ">
                  <DropdownMenuDialog />
                </Button>
              </div>
            )}
          </div>
        </header>
        {/* bottom navbar mobile */}
        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-md md:hidden">
            <ul className="flex justify-around items-center h-14">
              {[
                { label: "Home", icon: <House />, link: "/" },
                { label: "Offers", icon: <Gift />, link: "#" },
                { label: "Menu", icon: <ShoppingBasket />, link: "/menu" },
                { label: "Cart", icon: <ShoppingCart />, link: "#" },
                { label: "Profile", icon: <CircleUserRound />, link: "/login" },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => console.log(item.label)}
                    className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span
                      className="text-lg cursor-pointer"
                    >
                      <Link to={item.link}>{item.icon}</Link>
                    </span>
                    <span
                      className="text-[11px] cursor-pointer"
                      
                    >
                      <Link to={item.link}>{item.label}</Link>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </>
    );
  }
);

Navbar04.displayName = "Navbar04";

export { Logo };

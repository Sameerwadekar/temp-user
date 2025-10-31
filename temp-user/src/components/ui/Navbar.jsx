  "use client";
  import * as React from "react";
  import { useEffect, useState, useRef, useId } from "react";
  import { CircleUserRound, Gift, House, SearchIcon, ShoppingBasket, ShoppingCart } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { LogIn } from "lucide-react";

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
import { useNavigate } from "react-router-dom";

  // Simple logo component for the navbar
  const Logo = (props) => {
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 324 323"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect
          x="88.1023"
          y="144.792"
          width="151.802"
          height="36.5788"
          rx="18.2894"
          transform="rotate(-38.5799 88.1023 144.792)"
          fill="currentColor"
        />
        <rect
          x="85.3459"
          y="244.537"
          width="151.802"
          height="36.5788"
          rx="18.2894"
          transform="rotate(-38.5799 85.3459 244.537)"
          fill="currentColor"
        />
      </svg>
    );
  };


  // Default navigation links
  const defaultNavigationLinks = [
    { href: "#", label: "Home" },
    { href: "#", label: "Menu" },
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
              "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline",
              className
            )}
            {...props}
          >
            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
              {/* Left side */}
              <div className="flex flex-1 items-center gap-2 ">
                {/* Main nav */}
                <div className="flex flex-1 items-center gap-6 max-md:justify-between">
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
                  >
                    <div className="text-2xl">{logo}</div>
                    <span className=" font-bold text-xl sm:inline-block">
                      TempStation
                    </span>
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
                            href={link.href}
                            onClick={(e) => e.preventDefault()}
                            className="text-muted-foreground hover:text-primary py-1.5 font-medium transition-colors cursor-pointer group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                          >
                            {link.label}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                )}

                <form onSubmit={handleSearchSubmit} className="relative md:hidden">
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
                    className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onCartClick) onCartClick();
                    }}
                  >
                    <ShoppingCart />
                  </Button>
                 <div>
                  <DropdownMenuDialog/>
                 </div>
                </div>
              )}
            </div>
          </header>
          {/* bottom navbar mobile */}
          {isMobile && (
            <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-md md:hidden">
              <ul className="flex justify-around items-center h-14">
                {[
                  { label: "Home", icon: <House/>,link:"#"},
                  { label: "Offers", icon: <Gift/>,link:"#" },
                  { label: "Menu", icon: <ShoppingBasket/>,link:"#" },
                  {label:"Cart",icon:<ShoppingCart/>,link:"#"},
                  { label: "Profile", icon: <CircleUserRound/>,link:"/login" },
                ].map((item, i) => (
                  <li key={i}>
                    <button
                      onClick={() => console.log(item.label)}
                      className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span className="text-lg" onClick={()=>{navigate(item.link)}}>{item.icon}</span>
                      <span className="text-[11px]" onClick={()=>{navigate(item.link)}}>{item.label}</span>
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

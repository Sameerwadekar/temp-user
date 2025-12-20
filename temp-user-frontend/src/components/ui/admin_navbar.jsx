import {
  ChevronRightIcon,
  CircleSmallIcon,
  LogOutIcon,
  PanelLeftClose,
  ShoppingCartIcon,
  TicketPercent
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Context/LoginContext";


const navigationMenu = [
    {
      name: "Ecommerce",
      icon: ShoppingCartIcon,
      type: "category",
      children: [
        { name: "Products", icon: ShoppingCartIcon, type: "page",path:"/admin/products" },
        { name: "Categories", icon: ShoppingCartIcon, type: "page" },
        { name: "Shopping & Delivery", icon: ShoppingCartIcon, type: "page" },
        { name: "Location", icon: ShoppingCartIcon, type: "page" }
      ]
    },
  { name: "Coupons", icon: TicketPercent, type: "page" },
  { name: "Sign Out", icon: LogOutIcon, type: "page"},
];

const NavigationMenu = ({ item, level }) => {
    const navigate = useNavigate();
    const {logOutUser} = useLogin();
      const handleClick = () => {
    if (item.name === "Sign Out") {
      logOutUser(); // ✅ logout works
    } else if (item.path) {
      navigate(item.path); // ✅ navigation works
    }
  };
   if (item.type === "page") {
    return (
      <div
        onClick={handleClick}
        className="focus-visible:ring-ring/50 flex items-center gap-2 rounded-md p-1 outline-none focus-visible:ring-[3px] cursor-pointer"
        style={{ paddingLeft: level === 0 ? "0.25rem" : "1.75rem" }}
      >
        {level === 0 ? (
          <item.icon className="size-4 shrink-0" />
        ) : (
          <CircleSmallIcon className="size-4 shrink-0" />
        )}
        <span className="text-sm">{item.name}</span>
      </div>
    );
  }

  return (
    <Collapsible
      className="flex flex-col gap-1.5"
      style={{ paddingLeft: level === 0 ? "0" : "1.5rem" }}
    >
      <CollapsibleTrigger className="focus-visible:ring-ring/50 flex items-center gap-2 rounded-md p-1 outline-none focus-visible:ring-[3px]">
        {level === 0 ? (
          <item.icon className="size-4 shrink-0" />
        ) : (
          <CircleSmallIcon className="size-4 shrink-0" />
        )}
        <span className="flex-1 text-start text-sm">{item.name}</span>
        <ChevronRightIcon className="size-4 shrink-0 transition-transform data-[state=open]:rotate-90" />
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col gap-1.5">
        {item.children.map((child) => (
          <NavigationMenu key={child.name} item={child} level={level + 1} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default function SidebarMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button><PanelLeftClose/></Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-2.5 p-4 pt-0">
          {navigationMenu.map((item) => (
            <NavigationMenu key={item.name} item={item} level={0}   />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

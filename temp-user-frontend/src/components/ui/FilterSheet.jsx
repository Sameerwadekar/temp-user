import {
  BookText,
  CalendarDays,
  ChevronRight,
  Circle,
  Funnel,
  Heart,
  Home,
  LayoutPanelTop,
  LogIn,
  LogOut,
  Mail,
  MessageSquareText,
  PanelTop,
  ShoppingCart
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

// --- Navigation Menu Data ---
const navigationMenu = [
  {
    name: 'Dashboard',
    icon: Home,
    type: 'page'
  },
  {
    name: 'Layouts',
    icon: LayoutPanelTop,
    type: 'category',
    children: [
      { name: 'Content Navbar', icon: LayoutPanelTop, type: 'page' },
      { name: 'Horizontal', icon: LayoutPanelTop, type: 'page' },
      { name: 'Without Menu', icon: LayoutPanelTop, type: 'page' }
    ]
  },
  {
    name: 'Front Pages',
    icon: PanelTop,
    type: 'category',
    children: [
      { name: 'Landing Page', icon: PanelTop, type: 'page' },
      { name: 'Pricing Page', icon: PanelTop, type: 'page' },
      { name: 'Checkout Page', icon: PanelTop, type: 'page' }
    ]
  },
  { name: 'Chat', icon: MessageSquareText, type: 'page' },
  { name: 'Email', icon: Mail, type: 'page' },
  { name: 'Calendar', icon: CalendarDays, type: 'page' },
  {
    name: 'Ecommerce',
    icon: ShoppingCart,
    type: 'category',
    children: [
      { name: 'Products', icon: ShoppingCart, type: 'page' },
      { name: 'Categories', icon: ShoppingCart, type: 'page' },
      { name: 'Shopping & Delivery', icon: ShoppingCart, type: 'page' },
      { name: 'Location', icon: ShoppingCart, type: 'page' }
    ]
  },
  { name: 'Sign In', icon: LogIn, type: 'page' },
  { name: 'Sign Out', icon: LogOut, type: 'page' },
  { name: 'Support', icon: Heart, type: 'page' },
  { name: 'Documentation', icon: BookText, type: 'page' }
]

// --- Recursive Navigation Renderer ---
const NavigationMenu = ({ item, level }) => {
  if (item.type === 'page') {
    return (
      <div
        className="focus-visible:ring-ring/50 flex items-center gap-2 rounded-md p-1 outline-none focus-visible:ring-[3px]"
        style={{ paddingLeft: `${level === 0 ? 0.25 : 1.75}rem` }}
      >
        {level === 0 ? (
          <item.icon className="size-4 shrink-0" />
        ) : (
          <Circle className="size-4 shrink-0" />
        )}
        <span className="text-sm">{item.name}</span>
      </div>
    )
  }

  return (
    <Collapsible
      className="flex flex-col gap-1.5"
      style={{ paddingLeft: `${level === 0 ? 0 : 1.5}rem` }}
    >
      <CollapsibleTrigger className="focus-visible:ring-ring/50 flex items-center gap-2 rounded-md p-1 outline-none focus-visible:ring-[3px]">
        {level === 0 ? (
          <item.icon className="size-4 shrink-0" />
        ) : (
          <Circle className="size-4 shrink-0" />
        )}
        <span className="flex-1 text-start text-sm">{item.name}</span>
        <ChevronRight className="size-4 shrink-0 transition-transform [[data-state='open']>&]:rotate-90" />
      </CollapsibleTrigger>

      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down flex flex-col gap-1.5 overflow-hidden transition-all duration-300">
        {item.children.map((child) => (
          <NavigationMenu key={child.name} item={child} level={level + 1} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

// --- Main Component ---
export default function NavigationSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"><Funnel/></Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-2.5 p-4 pt-0">
          {navigationMenu.map((item) => (
            <NavigationMenu key={item.name} item={item} level={0} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

import { Funnel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useMenu } from "../Context/MenuContext";

export default function FilterSheet() {
  const {
    categories,
    selectedCat,
    fetchProductsByCategory
  } = useMenu();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Funnel />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>

        <ul className="mt-4 space-y-2">
          {categories.map((cat) => (
            <li
              key={cat.idCategory}
              onClick={() => fetchProductsByCategory(cat._links.products.href)}
              className={`cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-red-100 ${
                selectedCat === cat.strCategory
                  ? "text-red-500 font-bold"
                  : "text-gray-700"
              }`}
            >
              <img
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
                className="w-6 h-6 rounded"
              />
              {cat.name}
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}

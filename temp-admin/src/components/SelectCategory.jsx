import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMenu } from "./context/MenuContext";

function SelectCategory() {
  const { category, fetchProductsByCategory, fetchAllProducts } = useMenu();
  return (
    <>
      <Select
        onValueChange={(value) => {
          if (value === "all") {
            fetchAllProducts();
          } else {
            fetchProductsByCategory(value);
          }
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            <SelectItem value="all">Get All Categories</SelectItem>
            {category.map((cat) => {
              return (
                <SelectItem
                  key={cat._links.self.href}
                  value={cat._links.products.href}
                >
                  {cat.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectCategory;

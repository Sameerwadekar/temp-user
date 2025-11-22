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
  const { category, setCategory,fetchProductsByCategory } = useMenu();
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          {category.map((cat) => {
            return <SelectItem value={cat.name} onClick={()=>fetchProductsByCategory(cat._links.products.href)}>{cat.name}</SelectItem>;
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectCategory;

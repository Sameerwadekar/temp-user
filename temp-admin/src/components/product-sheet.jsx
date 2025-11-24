import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMenu } from "./context/MenuContext";
import SelectCategory from "./SelectCategory";
import { useForm, Controller } from "react-hook-form";

const DataTableDemo = () => {
  const { tableData, category } = useMenu();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // const columns = [
  //   {
  //     header: "Name",
  //     accessorKey: "name",
  //     size: 70,
  //     cell: ({ row }) => (
  //       <div className="font-medium w-[150px] wrap-break-word">
  //         {row.getValue("name")}
  //       </div>
  //     ),
  //   },

  //   {
  //     header: "Description",
  //     accessorKey: "description",
  //     size: 300,
  //     cell: ({ row }) => (
  //       <div className="font-medium w-[300px] overflow-hidden">
  //         {row.getValue("description")}
  //       </div>
  //     ),
  //   },

  //   {
  //     header: "Stock",
  //     accessorKey: "available",
  //     size: 50,
  //     cell: ({ row }) => (
  //       <div className="w-[120px]">
  //         {row.getValue("available") ? "Available" : "Not Available"}
  //       </div>
  //     ),
  //   },

  //   {
  //     accessorKey: "price",
  //     header: () => <div className="text-right w-[120px]">Amount</div>,
  //     cell: ({ row }) => {
  //       const amount = parseFloat(row.getValue("price"));
  //       return <div className="text-right font-medium">Rs,{amount}</div>;
  //     },
  //   },
  //   {
  //     id: "select",
  //     header: () => <div className="text-center">Update</div>,
  //     cell: ({ row }) => (
  //       <Button
  //         onClick={() => {
  //           setEditingProduct(row.original);
  //           setIsSheetOpen(true);
  //         }}
  //       >
  //         Update
  //       </Button>
  //     ),
  //   },
  // ];

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      size: 70,
      cell: ({ row }) => (
        <div className="font-medium w-[150px] wrap-break-word">
          {row.getValue("name")}
        </div>
      ),
    },

    {
      header: "Description",
      accessorKey: "description",
      size: 300,
      cell: ({ row }) => (
        <div className="font-medium w-[300px] overflow-hidden">
          {row.getValue("description")}
        </div>
      ),
    },

    {
      header: "Stock",
      accessorKey: "available",
      size: 50,
      cell: ({ row }) => (
        <div className="w-[120px]">
          {row.getValue("available") ? "Available" : "Not Available"}
        </div>
      ),
    },

    {
      accessorKey: "price",
      header: () => <div className="text-right w-[120px]">Amount</div>,
      size: 50,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));

        return (
          <div className="text-right font-medium w-[120px]">Rs,{amount}</div>
        );
      },
    },
    {
      id: "select",
      header: () => (
        <div className="text-right w-[120px] flex justify-center items-center">
          Update
        </div>
      ),
      size: 50,
      cell: ({ row }) => (
        <Button
          onClick={() => {
            setEditingProduct(row.original);
            setIsSheetOpen(true);
          }}
        >
          Update
        </Button>
      ),
    },
  ];
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
  });

  const { register, handleSubmit, control, reset } = useForm();

  useEffect(() => {
    if (editingProduct) {
      const href = editingProduct._links?.self?.href;
      const id = href ? href.split("/").pop() : null;

      reset({
        id,
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        available: editingProduct.available ? "true" : "false",
        category: editingProduct._links?.category?.href || "",
      });
    } else {
      reset();
    }
  }, [editingProduct, reset]);

  const onSubmit = (data) => {
    data.available = data.available === "true";

    const url = data.id
      ? `http://localhost:8080/product/${data.id}`
      : "http://localhost:8080/product";

    fetch(url, {
      method: data.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingProduct(null);
        setIsSheetOpen(false);
      })
      .catch(console.error);
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 py-4">
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-2xs"
        />
        <SelectCategory />

        <Sheet
          open={isSheetOpen}
          onOpenChange={(open) => {
            setIsSheetOpen(open);
            if (!open) {
              setEditingProduct(null);
              reset();
            }
          }}
        >
          <SheetTrigger
            asChild
            onClick={() => {
              setEditingProduct(null);
              reset({
                id: "",
                name: "",
                description: "",
                price: "",
                available: "",
                category: "",
              });
              setIsSheetOpen(true);
            }}
          >
            <Button variant="outline">
              <PlusIcon /> Add Product
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {editingProduct ? "Update Product" : "Add New Product"}
              </SheetTitle>
              <SheetDescription>Fill Product Details</SheetDescription>
            </SheetHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-4">
              {/* Hidden ID field */}
              <input type="hidden" {...register("id")} />

              <Label>Product Name</Label>
              <Input type="text" {...register("name", { required: true })} />

              <Label>Description</Label>
              <Input
                type="text"
                {...register("description", { required: true })}
              />

              <Label>Price</Label>
              <Input type="number" {...register("price", { required: true })} />

              <Label>Stock</Label>
              <Controller
                name="available"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Available</SelectItem>
                      <SelectItem value="false">Not Available</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <Label>Category</Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {category.map((cat) => (
                        <SelectItem
                          key={cat._links.self.href}
                          value={cat._links.self.href}
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              <SheetFooter>
                <Button type="submit">
                  {editingProduct ? "Update" : "Add"}
                </Button>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {/* TABLE DATA */}
      <div className="rounded-md border overflow-x-auto scrollbar-thin">
        <Table className="min-w-full whitespace-normal break-words">
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-normal break-words max-w-[200px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTableDemo;

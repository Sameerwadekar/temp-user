import { useState, useEffect } from "react";
import { PlusIcon } from "lucide-react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMenu } from "./context/MenuContext";
import SelectCategory from "./SelectCategory";


// ======================
//   TABLE COLUMNS
// ======================
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 20,
  },

  {
    header: "Name",
    accessorKey: "name",
    size: 70,
    cell: ({ row }) => (
      <div className="font-medium w-[150px] break-words">
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
      

      return <div className="text-right font-medium w-[120px]">Rs,{amount}</div>;
    },
  },
];

const DataTableDemo = () => {
  const {tableData,setTableData} = useMenu();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    amount: "",
    status: "pending",
  });


  // Add user handler
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.amount) return;

    const newEntry = {
      id: String(tableData.length + 1),
      ...newUser,
      amount: parseFloat(newUser.amount),
    };

    setTableData([...tableData, newEntry]);

    setNewUser({ name: "", email: "", amount: "", status: "pending" });
    setIsSheetOpen(false);
  };


  // Fetch product data
  useEffect(() => {
    fetch("http://localhost:8080/product")
      .then((res) => res.json())
      .then((data) => setTableData(data["_embedded"]["products"]))
      .catch((err) => console.log(err));
  }, []);

  //fetch categories
  useEffect(()=>{
    fetch("http://localhost:8080/categories")
    .then(res=>res.json())
    .then(data=>console.log(data["_embedded"]["categories"]))
    .catch(err=>console.log(err))
  },[])

  // React table config
  const table = useReactTable({
    data: tableData,
    columns,
    columnResizeMode: "onChange",
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });


  return (
    <div className="w-full">
      
      {/* Search + Add User */}
      <div className="flex  gap-2 py-4 max-sm:flex-col sm:items-center">
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-2xs"
        />
        <SelectCategory/>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <PlusIcon /> Add User
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New User</SheetTitle>
              <SheetDescription>Fill user details</SheetDescription>
            </SheetHeader>

            <div className="grid gap-4 px-4">
              <Label>Name</Label>
              <Input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />

              <Label>Email</Label>
              <Input value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />

              <Label>Amount</Label>
              <Input
                type="number"
                value={newUser.amount}
                onChange={(e) => setNewUser({ ...newUser, amount: e.target.value })}
              />

              <Label>Status</Label>
              <Select value={newUser.status} onValueChange={(v) => setNewUser({ ...newUser, status: v })}>
                <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <SheetFooter>
              <Button onClick={handleAddUser}>Add</Button>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>


      {/* TABLE */}
      <div className="rounded-md border overflow-x-auto">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold border border-amber-300" style={{ width: `${header.column.getSize()}px` }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
                    <TableCell key={cell.id} style={{ width: `${cell.column.getSize()}px` }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

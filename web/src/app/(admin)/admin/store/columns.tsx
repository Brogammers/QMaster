"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";

export type StoreStatus = 'NOT_REQUESTED' | 'PENDING' | 'APPROVED' | 'REJECTED';

export type StoreData = {
  id: string;
  name: string;
  category: string;
  storeStatus: StoreStatus;
  requestDate: string;
  productsCount: number;
  monthlyRevenue: string;
};

export const columns: ColumnDef<StoreData>[] = [
  {
    accessorKey: "name",
    header: "Partner Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "storeStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("storeStatus") as string;
      return (
        <Badge
          variant={
            status === "APPROVED"
              ? "success"
              : status === "PENDING"
              ? "warning"
              : status === "REJECTED"
              ? "destructive"
              : "secondary"
          }
        >
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
  },
  {
    accessorKey: "productsCount",
    header: "Products",
  },
  {
    accessorKey: "monthlyRevenue",
    header: "Monthly Revenue",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const store = row.original;
      const isPending = store.storeStatus === "PENDING";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {isPending && (
              <>
                <DropdownMenuItem className="text-green-600">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Request
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Request
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem>View Details</DropdownMenuItem>
            {store.storeStatus === "APPROVED" && (
              <DropdownMenuItem>View Store</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 
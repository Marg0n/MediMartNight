/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Loading from "@/components/shared/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteOrder, getAllOrders, updateOrder } from "@/services/orders";
import { IOrderDB, ShippingStatus } from "@/types/order";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2 } from 'lucide-react';

const ManageOrder = () => {
  const [orders, setOrders] = useState<IOrderDB[]>();
  const [page, setPage] = useState(1);
  const limit = 7; //? Set limit to x items per page
  const [selectedStatus, setSelectedStatus] =
    useState<ShippingStatus>("PENDING");
  const [selectedOrderId, setSelectedOrderId] = useState<
    ShippingStatus | string
  >("");
  const [openStatusDialog, setOpenStatusDialog] = useState(false);

  //* Available order status options
  const orderStatusOptions = [
    { label: "PENDING", value: "PENDING" },
    { label: "PROCESSING", value: "PROCESSING" },
    { label: "SHIPPED", value: "SHIPPED" },
    { label: "DELIVERED", value: "DELIVERED" },
    { label: "CANCELED", value: "CANCELED" },
  ];

  //* Fetch orders on component mount and when page changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrders();
        const orders = data?.data?.data || [];
        setOrders(orders);
      } catch (error) {
        console.error("Failed to fetch Order");
      }
    };
    fetchData();
  }, []);

  //* Handle order deletion
  const handleDeleteOrder = async (orderId: string) => {
    try {
      const result = await deleteOrder(orderId);
      if (result?.data?.success) {
        toast.success(result?.data?.message);
      }
    } catch (err: any) {
      toast.error("Failed to delete order", err);
    }
  };

  //* Handle order status update
  const handleUpdateOrder = async (orderId: string, shippingStatus: ShippingStatus) => {
    if (orderId && shippingStatus) {
      try {
        const result = await updateOrder(orderId, { shippingStatus });
        if (result?.success) {
          toast.success(result?.message);
          setOpenStatusDialog(false);
          setOrders((prevOrders) =>
            prevOrders?.map((order) =>
              order._id === orderId
                ? { ...order, shippingStatus: shippingStatus }
                : order
            )
          );
        }
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to update order");
      }
    } else {
      toast.error("Invalid order ID or status.");
    }
  };

  if (!orders) return <Loading />;
  if (orders?.length < 1) {
    return (
      <div>
        <h2 className="text-center font-bold text-3xl mb-14">
          Till now There is no order to show!!
        </h2>
      </div>
    );
  }

  //* Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedOrders = orders.slice(startIndex, endIndex);

  return (
    <div className="lg:w-full p-8 border rounded-xl shadow-lg bg-white">
      <h2 className="text-center font-bold text-3xl mb-10 text-[#4F46E5] tracking-tight">
        Order Management Dashboard
      </h2>

      <Table className="border rounded-lg overflow-hidden">
        <TableCaption className="mt-6 text-slate-600 font-medium">
          Comprehensive list of all customer orders
        </TableCaption>
        <TableHeader className="bg-[#4F46E5]">
          <TableRow>
            <TableHead className="font-semibold text-white py-4">Customer Name</TableHead>
            <TableHead className="font-semibold text-white">Product Name</TableHead>
            <TableHead className="font-semibold text-white">Payment</TableHead>
            <TableHead className="font-semibold text-white">Shipping Status</TableHead>
            <TableHead className="font-semibold text-white">Amount</TableHead>
            <TableHead className="text-right font-semibold text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedOrders?.map((order) => (
            <TableRow key={order._id} className="hover:bg-gray-50/50 transition-all duration-200">
              <TableCell className="font-medium text-gray-900">{order.user.name}</TableCell>
              <TableCell className="font-medium text-gray-700">
                {order?.products[0]?.product?.name}
              </TableCell>
              <TableCell>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order?.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {order?.paymentStatus}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer w-32 font-medium" variant="outline">
                      <span className={`${
                        order?.shippingStatus === 'DELIVERED' ? 'text-green-600' :
                        order?.shippingStatus === 'CANCELED' ? 'text-red-600' :
                        order?.shippingStatus === 'PROCESSING' ? 'text-blue-600' :
                        order?.shippingStatus === 'SHIPPED' ? 'text-purple-600' :
                        'text-yellow-600'
                      }`}>
                        {order?.shippingStatus}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-2 w-32">
                    <DropdownMenuGroup>
                      {orderStatusOptions?.map((option) => (
                        <DropdownMenuItem
                          key={option?.label}
                          className="cursor-pointer py-2 hover:bg-gray-100 rounded-md transition-colors"
                          onClick={() => {
                            setSelectedStatus(option?.value as ShippingStatus);
                            setOpenStatusDialog(true);
                            setSelectedOrderId(order?._id);
                          }}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell className="font-medium">
                ${order?.totalPrice.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant='outline' className="hover:bg-red-500 hover:text-white transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-lg">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl">
                        Confirm Deletion
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-600">
                        This action cannot be undone. This will permanently
                        delete this order data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-md">Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        Delete Order
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-8 gap-4 items-center">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          ⬅️ Previous
        </Button>

        <span className="flex items-center font-medium text-lg text-gray-700">
          Page {page}
        </span>

        <Button
          variant="outline"
          disabled={endIndex >= (orders?.length || 0)}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          Next ➡️
        </Button>
      </div>
      <AlertDialog open={openStatusDialog} onOpenChange={setOpenStatusDialog}>
        <AlertDialogContent className="rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Update Order Status</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to change the status to{" "}
              <span className="font-semibold text-purple-600">
                {selectedStatus}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-md">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
              onClick={() => handleUpdateOrder(selectedOrderId, selectedStatus)}
            >
              Update Status
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageOrder;

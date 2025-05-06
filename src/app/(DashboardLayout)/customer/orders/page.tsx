"use client";

import Loading from "@/components/shared/Loading"; // Loading component
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/contexts/UserContext";
import { getOrdersByUserId } from "@/services/orders";
import { IOrderDB } from "@/types/order";
import { ChevronDown, ChevronRight, ScrollText } from "lucide-react";
import React, { useEffect, useState } from "react";

const ViewOrders = () => {
  const [orders, setOrders] = useState<IOrderDB[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  //* New: Track which order row is expanded
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  //* user info
  const { user } = useUser();

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("No auth token found.");
        return;
      }

      try {
        //* Directly access user._id, no need for await
        const userId = user?._id;

        if (!userId) {
          throw new Error("User ID is missing");
        }

        const data = await getOrdersByUserId(userId as string);

        // console.log("data", data); 

        setOrders(data?.data || []);
      } catch (error) {
        setIsError(true);
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?._id) {
      fetchOrders();
    }
  }, [user]); //? <-- Added dependency on `user`

  if (isLoading) return <Loading />;
  if (isError) return <p>Failed to load orders.</p>;
  if (orders.length < 1) {
    return (
      <div>
        <h2 className="text-center font-bold text-3xl mb-14">
          You do not have any orders yet.
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full p-6 border-2 shadow-md rounded-2xl bg-white">
      <h2 className="flex justify-center items-center gap-2 font-bold text-3xl mb-14 text-[#4F46E5]">
        <ScrollText size={30} />All of Your Orders
      </h2>

      <Table className="border-collapse">
        <TableCaption className="mt-8 text-gray-500 italic">
          Your order history and details
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <TableHead className="text-white font-bold py-4">Order Date</TableHead>
            <TableHead className="text-white font-bold">Payment</TableHead>
            <TableHead className="text-white font-bold">Shipping</TableHead>
            <TableHead className="text-white font-bold">Shipping Address</TableHead>
            <TableHead className="text-white font-bold text-right">Shipping Cost</TableHead>
            <TableHead className="text-white font-bold text-right">Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const isOpen = openOrderId === order._id;

            return (
              <React.Fragment key={order._id}>
                {/*   Parent row that toggles sub-row */}
                <TableRow
                  onClick={() => setOpenOrderId(isOpen ? null : order._id)}
                  className="cursor-pointer hover:bg-gray-50 border-b transition-colors duration-200"
                >
                  <TableCell className="font-medium flex items-center gap-2">
                    {isOpen ? (
                      <ChevronDown size={16} className="text-indigo-600" />
                    ) : (
                      <ChevronRight size={16} className="text-indigo-600" />
                    )}
                    {new Date(order?.createdAt as string).toLocaleString()}
                  </TableCell>
                  <TableCell className={`font-medium ${
                    order.paymentStatus === 'PAID' ? 'text-green-600' : 
                    order.paymentStatus === 'UNPAID' ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    {order.paymentStatus}
                  </TableCell>
                  <TableCell className={`font-medium ${
                    order.shippingStatus === 'DELIVERED' ? 'text-green-600' :
                    order.shippingStatus === 'PENDING' ? 'text-orange-600' : 'text-blue-600'
                  }`}>
                    {order.shippingStatus}
                  </TableCell>
                  <TableCell>{order.shippingAddress}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${order.shippingCost}
                  </TableCell>
                  <TableCell className="text-right font-bold text-indigo-600">
                    ${order.totalPrice}
                  </TableCell>
                </TableRow>

                {/* Conditionally rendered sub-table for product details */}
                {isOpen && (
                  <TableRow>
                    <TableCell colSpan={6} className="bg-gray-50 p-4">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-gray-100 to-gray-200">
                            <TableHead className="font-semibold text-gray-700">Product Name</TableHead>
                            <TableHead className="text-right font-semibold text-gray-700">
                              Quantity
                            </TableHead>
                            <TableHead className="text-right font-semibold text-gray-700">Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.products.map((product, idx) => (
                            <TableRow key={idx} className="hover:bg-gray-100">
                              <TableCell className="font-medium">{product.name || "N/A"}</TableCell>
                              <TableCell className="text-right">
                                {product.quantity}
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                ${product.price}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewOrders;

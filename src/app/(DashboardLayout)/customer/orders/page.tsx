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
import { ChevronDown, ChevronRight } from "lucide-react";
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
    <div className="w-full min-h-full p-6 border-2 shadow-md rounded-2xl">
      <h2 className="text-center font-bold text-3xl mb-14 text-[#4F46E5]">
        All of Your Orders
      </h2>

      <Table>
        <TableCaption className="mt-8">
          {/* A list of your recent Orders */}
        </TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead>Product Name</TableHead> */}
            <TableHead>Order Date</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Shipping Address</TableHead>
            <TableHead className="text-right">Shipping Cost</TableHead>
            {/* <TableHead className="text-right">Quantity</TableHead> */}
            {/* <TableHead className="text-right">Price</TableHead> */}
            <TableHead className="text-right">Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {orders?.map((order) =>
          order.products.map((product, index) => (
            <TableRow key={`${order._id}-${index}`}>
              <TableCell className="font-medium">
                {product.name || "N/A"}
              </TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
              <TableCell>{order.shippingStatus}</TableCell>
              <TableCell>{order.shippingAddress}</TableCell>
              <TableCell className="text-right">{order.shippingCost}</TableCell>
              <TableCell className="text-right">{product.quantity}</TableCell>
              <TableCell className="text-right">{product.price}</TableCell>
              <TableCell className="text-right">${order.totalPrice}</TableCell>
            </TableRow>
          ))
        )} */}
          {orders.map((order) => {
            const isOpen = openOrderId === order._id;

            return (
              <React.Fragment key={order._id}>
                {/*   Parent row that toggles sub-row */}
                <TableRow
                  onClick={() => setOpenOrderId(isOpen ? null : order._id)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <TableCell className="font-medium flex items-center gap-2">
                    {isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                    {/* Order #{order._id.slice(-6)} */}
                    {new Date(order?.createdAt as string).toLocaleString()}
                  </TableCell>
                  <TableCell>{order.paymentStatus}</TableCell>
                  <TableCell>{order.shippingStatus}</TableCell>
                  <TableCell>{order.shippingAddress}</TableCell>
                  <TableCell className="text-right">
                    {order.shippingCost}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${order.totalPrice}
                  </TableCell>
                </TableRow>

                {/* Conditionally rendered sub-table for product details */}
                {isOpen && (
                  <TableRow>
                    <TableCell colSpan={6} className="bg-gray-100 p-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead className="text-right">
                              Quantity
                            </TableHead>
                            <TableHead className="text-right">Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.products.map((product, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{product.name || "N/A"}</TableCell>
                              <TableCell className="text-right">
                                {product.quantity}
                              </TableCell>
                              <TableCell className="text-right">
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

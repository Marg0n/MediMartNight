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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ordersPerPage = 7;

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
  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <h2 className="text-center font-semibold text-2xl text-gray-700">
          No orders found. Your order history will appear here once you make a purchase.
        </h2>
      </div>
    );
  }

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full min-h-[85vh]  border-2 shadow-md rounded-2xl bg-white">
      <div className="p-6 min-h-[70vh]">
        <h2 className="flex justify-center items-center gap-2 font-bold text-3xl mb-14 text-[#4F46E5]">
          <ScrollText size={30} />All of Your Orders
        </h2>

        <Table className="border-collapse">
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
            {currentOrders.map((order) => {
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
          <TableCaption className="mt-8 text-gray-500 italic">
            Your order history and details
          </TableCaption>
        </Table>

      </div>
        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
    </div>
  );
};

export default ViewOrders;

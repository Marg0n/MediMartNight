/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getAllOrders } from "@/services/orders";
import { IUser } from "@/types";
import { IOrderDB } from "@/types/order";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  user: IUser;
};

const UserDetailsPage = ({ user }: Props) => {
  const [orders, setOrdders] = useState<IOrderDB[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrders();
        const orders = data?.data?.data || [];
        // Filter orders for the specific user
        setOrdders(
          orders.filter((order: IOrderDB) => order?.user?._id === user._id),
        );
      } catch (error) {
        console.error("Failed to fetch Users:", error);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="">
      <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-lg p-8 border border-gray-200">
        <div className="flex items-center gap-6">
          <Image
            src={(user?.image as string) || `https://i.pravatar.cc/100?`}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full w-24 h-24"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-[16px]">
          <div>
            <strong>User ID:</strong>{" "}
            <span className="text-gray-700">{user?._id}</span>
          </div>
          <div>
            <strong>Role:</strong>{" "}
            <span className="capitalize text-blue-600 font-medium">
              {user?.role}
            </span>
          </div>
          <div>
            <strong>Status:</strong>{" "}
            <span
              className={`${
                user?.status === "active" ? "text-green-600" : "text-red-500"
              } font-medium`}
            >
              {user?.status}
            </span>
          </div>
          <div>
            <strong>Needs Password Change:</strong>{" "}
            <span
              className={
                user?.needsPasswordChange
                  ? "text-yellow-600 font-semibold"
                  : "text-gray-600"
              }
            >
              {user?.needsPasswordChange ? "Yes 🔒" : "No"}
            </span>
          </div>
          {user?.createdAt && (
            <div>
              <strong>Created At:</strong>{" "}
              <span className="text-gray-700">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(user?.createdAt))}
              </span>
            </div>
          )}
          {user?.updatedAt && (
            <div>
              <strong>Last Updated:</strong>{" "}
              <span className="text-gray-700">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(user?.updatedAt))}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">No of Products</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Shipping Status</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Is Deleted</th>
              <th className="px-4 py-2">Shipping Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 text-sm text-gray-800 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{order.city}</td>
                  <td className="px-4 py-2">{order.products.length}</td>
                  <td className="px-4 py-2">${order.totalPrice}</td>
                  <td className="px-4 py-2">{order.shippingStatus}</td>
                  <td className="px-4 py-2">{order.paymentStatus}</td>
                  <td className="px-4 py-2">{order.transactionId}</td>
                  <td className="px-4 py-2">
                    {order.isDeleted ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2">{order.shippingAddress}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No Orders Data Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetailsPage;

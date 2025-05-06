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
import { getAllOrders, getOrdersByUserId } from "@/services/orders";
import { deleteUser, getAllUsers } from "@/services/users";
import { IUser } from "@/types";
import { IOrderDB } from "@/types/order";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageUsers = () => {
  const [orders, setOrders] = useState<IOrderDB[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [userOrders, setUserOrders] = useState<
    Record<string, { running: number; delivered: number }>
  >({});
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isDeleting, setIsDeleting] = useState(false);

  // Calculate pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingUsers(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("No auth token found.");
        return;
      }
      try {
        const data = await getAllUsers(token);

        setUsers(data?.data || []);
        // const totalItems = data?.data?.meta?.total || 0;
        // setTotalPages(Math.ceil(totalItems / limit));
      } catch (error) {
        console.error("Failed to fetch Users:", error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrders();
        const orders = data?.data?.data || [];
        // Filter orders for the specific user
        setOrders(orders);
        // orders.filter((order: IOrderDB) => order?.user?._id === user._id)
      } catch (error) {
        console.error("Failed to fetch Users:", error);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  //* Fetch orders for each user
  useEffect(() => {
    const fetchUserOrders = async () => {
      setIsLoadingOrders(true);
      const ordersMap: Record<string, { running: number; delivered: number }> =
        {};

      for (const user of users) {
        if (!user._id) continue;

        try {
          const res = await getOrdersByUserId(user._id);
          const userOrders = Array.isArray(res?.data) ? res.data : [];

          ordersMap[user._id] = {
            running: userOrders.filter(
              (order: IOrderDB) => order.shippingStatus !== "DELIVERED",
            ).length,
            delivered: userOrders.filter(
              (order: IOrderDB) => order.shippingStatus === "DELIVERED",
            ).length,
          };
        } catch (error) {
          console.error(`Failed to fetch orders for user ${user._id}:`, error);
          ordersMap[user._id] = { running: 0, delivered: 0 };
        }
      }

      setUserOrders(ordersMap);
      setIsLoadingOrders(false);
    };

    if (users.length > 0) {
      fetchUserOrders();
    }
  }, [users]);

  //* Handle page navigation
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!userId) return;

    setIsDeleting(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("No auth token found.");
      return;
    }

    try {
      const res = await deleteUser(userId);
      if (res?.success) {
        toast.success("User deleted successfully");
        setUsers((prev) => prev.filter((user) => user._id !== userId));
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoadingUsers) {
    return <Loading />;
  }

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          👥 Manage Users
        </h2>

        <div className="overflow-x-auto shadow-lg rounded-lg bg-white dark:bg-gray-900">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-indigo-600">
              <tr>
                {[
                  "Name",
                  "Email",
                  "Role",
                  "Running Orders",
                  "Delivered Orders",
                  "Update",
                  "Delete",
                ].map((title) => (
                  <th
                    key={title}
                    className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoadingOrders ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center">
                    <Loading />
                  </td>
                </tr>
              ) : currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td
                      className={`px-3 py-1 text-shadow-xs font-bold rounded-6xl text-center ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100"
                          : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                      }`}
                    >
                      {user.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-end">
                      {user._id ? userOrders[user._id]?.running || 0 : 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-end">
                      {user._id ? userOrders[user._id]?.delivered || 0 : 0}
                    </td>
                    <td className=" text-center">
                      <Link href={`/admin/users/${user._id}`}>
                        <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition">
                          📝 Details
                        </button>
                      </Link>
                    </td>
                    <td className="text-center">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="hover:bg-red-500 hover:text-white"
                            disabled={isDeleting}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete this user and all their data
                              from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() =>
                                user._id && handleDeleteUser(user._id)
                              }
                            >
                              {isDeleting ? "Deleting..." : "Confirm Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-gray-500">
                    No Data Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 py-4 border-t">
            {/* Previous Page Button */}
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={handlePrevPage}
              className="hover:bg-indigo-100"
            >
              ⬅ Previous
            </Button>

            {/* Current Page Indicator */}
            <span className="px-4 py-2 font-medium text-gray-700">
              Page {currentPage} of {totalPages || 1}
            </span>

            {/* Next Page Button */}
            <Button
              variant="outline"
              disabled={currentPage >= totalPages}
              onClick={handleNextPage}
              className="hover:bg-indigo-100"
            >
              Next ➡
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;

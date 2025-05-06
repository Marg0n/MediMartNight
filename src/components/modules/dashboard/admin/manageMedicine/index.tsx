/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { deleteProduct, getAllProducts } from "@/services/Product";
import { TMedicine } from "@/types";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageMedicine = () => {
  const [medicines, setMedicines] = useState<TMedicine[]>([]);
  const [allMedicines, setAllMedicines] = useState<TMedicine[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const limit = 10;

  // Fetch all categories on initial load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllProducts("1", "1000", {});
        const medicines = data?.data?.result || [];
        const categories = new Set<string>(
          medicines
            .map((med: TMedicine) => med.dosCategory as string)
            .filter(Boolean),
        );
        setAvailableCategories(["All", ...Array.from(categories)]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllProducts(page.toString(), limit.toString(), {
          category: selectedCategory !== "All" ? selectedCategory : undefined,
        });
        const fetchedMedicines = data?.data?.result || [];
        setAllMedicines(fetchedMedicines);

        // Apply search filter locally
        const filteredMedicines = searchQuery
          ? fetchedMedicines.filter((med: TMedicine) =>
              med.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
          : fetchedMedicines;

        setMedicines(filteredMedicines);
        const totalItems = filteredMedicines.length;
        setTotalPages(Math.ceil(totalItems / limit));
      } catch (error) {
        console.error("Failed to fetch medicines:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, selectedCategory]);

  // Handle search locally
  useEffect(() => {
    if (searchQuery) {
      const filtered = allMedicines.filter((med: TMedicine) =>
        med.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setMedicines(filtered);
      setTotalPages(Math.ceil(filtered.length / limit));
    } else {
      setMedicines(allMedicines);
      setTotalPages(Math.ceil(allMedicines.length / limit));
    }
    setPage(1); // Reset to first page on search
  }, [searchQuery, allMedicines]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setPage(1); // Reset to first page on category change
  };

  const handlePrev = () => {
    if (page > 1 && !isLoading) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages && !isLoading) setPage(page + 1);
  };

  const handleDelete = async (med: TMedicine) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No auth token found.");
      return;
    }

    try {
      const res = await deleteProduct(med._id as string, token);
      if (res?.success || res?.message?.toLowerCase().includes("delete")) {
        setMedicines((prev) => prev.filter((m) => m._id !== med?._id));
      } else {
        toast.error("Failed to delete the medicine.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#4F46E5]">
        🧾 Manage All Medicines
      </h2>
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-indigo-600">
            <tr>
              {["Name", "Category", "Stock", "Status", "Update", "Delete"].map(
                (title) => (
                  <th
                    key={title}
                    className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    {title}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500 dark:text-gray-300"
                >
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-5 h-5 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <span></span>
                  </div>
                </td>
              </tr>
            ) : medicines.length > 0 ? (
              medicines.map((med) => (
                <tr
                  key={med._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {med.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {med.dosCategory}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {med.quantity}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        med.quantity < 10
                          ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
                          : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                      }`}
                    >
                      {med.quantity < 10 ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                  <td className=" text-center">
                    <Link href={`/admin/medicines/${med._id}`}>
                      <div className="inline-flex items-center justify-center p-2 text-blue-600 hover:text-white hover:bg-[#4F46E5] rounded-full transition">
                        <PencilIcon className="h-5 w-5" />
                      </div>
                    </Link>
                  </td>
                  <td className="text-center">
                    {/* Delete Button */}
                    <button
                      className="inline-flex items-center justify-center p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-full transition"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>

                    {/* Modal */}
                    {isModalOpen && (
                      <div className=" backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                          <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Confirm Delete
                          </h2>
                          <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this medicine? This
                            action cannot be undone.
                          </p>
                          <div className="flex justify-end gap-4">
                            <button
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                              onClick={() => setIsModalOpen(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                              onClick={() => handleDelete(med)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-4 pb-6">
          <button
            onClick={handlePrev}
            disabled={page === 1 || isLoading}
            className="px-4 py-2 bg-indigo-100 text-indigo-800 font-semibold rounded hover:bg-indigo-200 disabled:opacity-50 transition"
          >
            ⬅ Previous
          </button>
          <span className="px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages || isLoading}
            className="px-4 py-2 bg-indigo-100 text-indigo-800 font-semibold rounded hover:bg-indigo-200 disabled:opacity-50 transition"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageMedicine;

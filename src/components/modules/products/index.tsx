/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import FilterSearch from "./AllProduct/filterSearch";
import InfiniteProductList from "./AllProduct/inifinityScroll";
import { Button } from "@/components/ui/button";

const AllProducts = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    symptoms: "",
  });

  const [showSidebar, setShowSidebar] = useState(false);

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="m-4 md:m-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#4F46E5] to-rose-500 bg-clip-text text-transparent tracking-wide">
        Explore Our Medicine Collection
      </h1>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden flex justify-end sticky top-24 z-30 mb-4">
        <Button
          onClick={() => setShowSidebar(true)}
          className="shadow-md px-5 py-2 text-sm font-semibold rounded-lg bg-white border border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white transition"
        >
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-7 gap-6 justify-items-center content-center">
        {/* Product List */}
        <div className="lg:col-span-4 xl:col-span-5  p-6 rounded-xl">
          <InfiniteProductList filters={filters} />
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-2 xl:col-span-2">
          <div className="sticky top-28 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-[#4F46E5]">Filter Products</h3>
            <FilterSearch onFilterChange={handleFilterChange} />
          </div>
        </aside>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 backdrop-blur-lg bg-black/20 ${
          showSidebar ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setShowSidebar(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 w-3/4 sm:w-2/5 h-full bg-white z-50 p-6 overflow-y-auto transition-transform duration-300 transform shadow-2xl ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#4F46E5]">Filters</h2>
          <button
            onClick={() => setShowSidebar(false)}
            className="text-2xl font-bold text-red-500 hover:text-red-600"
          >
            ✕
          </button>
        </div>
        <FilterSearch onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
};

export default AllProducts;
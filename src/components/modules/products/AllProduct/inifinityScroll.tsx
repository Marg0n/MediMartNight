/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loading from "@/components/shared/Loading";
import { TMedicine } from "@/types";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "./productCard";
import { getAllProducts } from "@/services/Product";

const limit = 8;

const InfiniteProductList = ({ filters }: { filters: Record<string, any> }) => {
  const [products, setProducts] = useState<TMedicine[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (pageNum = 1, concat = false) => {
    try {
      setLoading(true);
      const res = await getAllProducts(
        pageNum.toString(),
        limit.toString(),
        filters
      );

      const newProducts = res?.data?.result || [];
      const total = res?.data?.meta?.total || 0;

      if (concat) {
        setProducts((prev) => [...prev, ...newProducts]);
      } else {
        setProducts(newProducts);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setHasMore((prev) => products.length + newProducts.length < total);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchProducts(1, false);
  }, [filters]);

  const fetchMoreData = () => {
    const nextPage = page + 1;
    fetchProducts(nextPage, true);
    setPage(nextPage);
  };

  // Show loading spinner on first load
  if (loading && page === 1) {
    return (
      <div className="text-center py-12">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="text-center py-4">
            <Loading />
          </div>
        }
        endMessage={
          <p className="text-center py-4 text-gray-500">
            {products.length === 0 ? (
              <span className="text-2xl text-gray-500 mt-4">
                No Product Found!!
              </span>
            ) : (
              <span className="text-gray-500 mt-4">
                Yay! You have seen it all!!
              </span>
            )}
          </p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 pt-3">
          {products.map((medicine, index) => (
            <ProductCard key={`${medicine._id}-${index}`} medicine={medicine} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteProductList;

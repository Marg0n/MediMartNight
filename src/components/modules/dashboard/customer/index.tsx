/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loading from "@/components/shared/Loading";
import { useUser } from "@/contexts/UserContext";
import { getOrdersByUserId } from "@/services/orders";
import { IOrderDB } from "@/types/order";
import { PackageIcon, ShoppingCartIcon, TruckIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PieChartComponent } from "./chart/PieChartComponent";

const UserDashboard = () => {
  const [orders, setOrders] = useState<IOrderDB[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser(); //? Get logged-in user

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) return; //? Ensure user ID exists

      try {
        const res = await getOrdersByUserId(user._id);
        const fetchedOrders = Array.isArray(res?.data) ? res.data : [];
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]); //? Add dependency on user

  //* Group orders by month
  const ordersByMonth = orders.reduce((acc: Record<string, any>, order) => {
    //? Format the month as "YYYY-MM"
    const date = new Date(order?.createdAt as string);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}`;

    if (!acc[month]) {
      acc[month] = {
        month,
        PENDING: 0,
        PROCESSING: 0,
        SHIPPED: 0,
        DELIVERED: 0,
        CANCELLED: 0,
      };
    }

    //* Increment based on order status
    switch (order.shippingStatus) {
      case "PENDING":
        acc[month].PENDING++;
        break;
      case "PROCESSING":
        acc[month].PROCESSING++;
        break;
      case "SHIPPED":
        acc[month].SHIPPED++;
        break;
      case "DELIVERED":
        acc[month].DELIVERED++;
        break;
      case "CANCELLED":
        acc[month].CANCELLED++;
        break;
    }

    return acc;
  }, {});

  //* Convert ordersByMonth object to an array
  const chartDataByMonth = Object.values(ordersByMonth).sort(
    (a: any, b: any) =>
      new Date(a.month).getTime() - new Date(b.month).getTime(),
  );

  //* Stats for general dashboard
  const stats = {
    ordersPlaced: orders.length,
    pendingDeliveries: orders.filter(
      (order) => order.shippingStatus === "PENDING",
    ).length,
    processing: orders.filter((order) => order.shippingStatus === "PROCESSING")
      .length,
    shipped: orders.filter((order) => order.shippingStatus === "SHIPPED")
      .length,
    delivered: orders.filter((order) => order.shippingStatus === "DELIVERED")
      .length,
    cancelled: orders.filter((order) => order.shippingStatus === "CANCELLED")
      .length,
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Customer Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Orders Placed"
          value={loading ? "..." : stats.ordersPlaced.toString()}
          icon={<ShoppingCartIcon className="w-8 h-8 text-black" />}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Pending Deliveries"
          value={loading ? "..." : stats.pendingDeliveries.toString()}
          icon={<TruckIcon className="w-8 h-8 text-black" />}
          color="from-yellow-500 to-orange-500"
        />
        <StatCard
          title="Delivered"
          value={loading ? "..." : stats.delivered.toString()}
          icon={<PackageIcon className="w-8 h-8 text-black" />}
          color="from-green-400 to-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LinkCard title="Manage Orders" href="/customer/orders" />
        <LinkCard title="Browse Profile" href="/profile" />
        <LinkCard title="Profile Settings" href="/update-user" />
      </div>

      <div className="mt-10">
        <PieChartComponent orders={orders} />
      </div>
    </div>
  );
};

//* StatCard component for displaying stats
const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <div
    className={`bg-gradient-to-r ${color} text-white rounded-xl shadow-lg p-6 flex items-center justify-between`}
  >
    <div>
      <p className="text-sm">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
    <div className="bg-white bg-opacity-20 p-3 rounded-full">{icon}</div>
  </div>
);

//* LinkCard component for links to other pages
const LinkCard = ({ title, href }: { title: string; href: string }) => (
  <Link href={href}>
    <div className="bg-white border border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all p-6 rounded-xl cursor-pointer min-h-32">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">Click to manage</p>
    </div>
  </Link>
);

export default UserDashboard;

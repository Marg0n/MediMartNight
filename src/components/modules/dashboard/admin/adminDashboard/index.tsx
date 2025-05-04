/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAllOrders } from "@/services/orders";
import { IOrderDB } from "@/types/order";
import {
  ChartBarIcon,
  ClipboardListIcon,
  DollarSignIcon,
  ShoppingBagIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IOrderStats {
  totalOrders: number;
  currentPage: number;
  totalPages: number;
  data: IOrderDB[];
}

const AdminDashboard = () => {
  //* state for oreders
  const [orders, setOrders] = useState<IOrderStats>();
  const [loading, setLoading] = useState(true);

  //* fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders(1,100); 
        console.log(res.data)
        setOrders(res?.data);
      } catch (err: any) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log('data',orders)

  const stats = {
    ordersPlaced: orders?.data.length,
    pendingDeliveries: orders?.data.filter((order) => order.shippingStatus === "PENDING").length,
    delivered: orders?.data.filter((order) => order.shippingStatus === "DELIVERED").length,
    outOfStock: orders?.data.filter((order) => order.products.some((item) => item.product && item.product.inStock === false)).length,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Total Orders"
          // value={orders?.totalOrders.toString() as string}
          value={stats.ordersPlaced?.toString() as string || 'N/A'}
          icon={<ClipboardListIcon className="w-8 h-8 text-black" />}
          color="from-indigo-500 to-purple-500"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingDeliveries?.toString() as string || 'N/A'}
          icon={<ChartBarIcon className="w-8 h-8 text-black" />}
          color="from-yellow-500 to-orange-500"
        />
        <StatCard
          title="Out of Stock"
          value={stats.outOfStock?.toString() as string || 'N/A'}
          icon={<ShoppingBagIcon className="w-8 h-8 text-black" />}
          color="from-red-500 to-pink-500"
        />
        <StatCard
          title="Total Users"
          value="300"
          icon={<User className="w-8 h-8 text-black" />}
          color="from-green-400 to-emerald-500"
        />
        <StatCard
          title="Revenue"
          value="$12,000"
          icon={<DollarSignIcon className="w-8 h-8 text-black" />}
          color="from-blue-500 to-cyan-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LinkCard title="Manage Medicines" href="/admin/medicines" />
        <LinkCard title="Manage Orders" href="/admin/orders" />
        <LinkCard title="Manage Users" href="/admin/users" />
      </div>
    </div>
  );
};

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

const LinkCard = ({ title, href }: { title: string; href: string }) => (
  <Link href={href}>
    <div className="bg-white border border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all p-6 rounded-xl cursor-pointer">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">Click to manage</p>
    </div>
  </Link>
);

export default AdminDashboard;

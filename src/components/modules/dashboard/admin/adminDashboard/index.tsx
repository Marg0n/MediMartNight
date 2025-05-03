// app/admin/page.tsx
"use client";

import {
  ChartBarIcon,
  ClipboardListIcon,
  DollarSignIcon,
  ShoppingBagIcon,
  User,
} from "lucide-react";
import Link from "next/link";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Total Orders"
          value="120"
          icon={<ClipboardListIcon className="w-8 h-8 text-black" />}
          color="from-indigo-500 to-purple-500"
        />
        <StatCard
          title="Pending Approvals"
          value="15"
          icon={<ChartBarIcon className="w-8 h-8 text-black" />}
          color="from-yellow-500 to-orange-500"
        />
        <StatCard
          title="Out of Stock"
          value={"5"}
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

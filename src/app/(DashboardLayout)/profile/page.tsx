/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useUser } from "@/contexts/UserContext";
import { UserIcon, MailIcon, ShieldCheckIcon } from "lucide-react";
import Loading from '@/components/shared/Loading';
import Image from "next/image";

const UserProfilePage = () => {
  const { user, isLoading } = useUser();

  if (isLoading || !user) return <div className="p-8"><Loading/></div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl text-[#4F46E5] font-semibold mb-6 justify-center flex items-center gap-2">
        {user?.name || "User"}&apos;s  Profile
      </h1>


      <div className="justify-center flex items-center gap-2  relative mb-20">
        <img
          src={"https://i.ibb.co.com/G2xCfZf/interior-design-mountain-view.jpg"} 
          alt={user?.name} 
          className="w-full rounded-2xl h-68"
        />
        <Image 
          src={user?.image || "https://github.com/shadcn.png"} 
          alt={user?.name} 
          width={100} 
          height={100} 
          className="rounded-full bg-cover absolute -bottom-10 border-2 border-[#4F46E5]"
        />
      </div>


      <div className="space-y-6">
        <ProfileField
          label="Name"
          value={user.name}
          icon={<UserIcon className="w-5 h-5 text-gray-600" />}
        />
        <ProfileField
          label="Email"
          value={user.email}
          icon={<MailIcon className="w-5 h-5 text-gray-600" />}
        />
        <ProfileField
          label="Role"
          value={user.role}
          icon={<ShieldCheckIcon className="w-5 h-5 text-gray-600" />}
        />
        <ProfileField
          label="Status"
          value={user.status || "active"}
          icon={<ShieldCheckIcon className="w-5 h-5 text-gray-600" />}
        />
      </div>
    </div>
  );
};

const ProfileField = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | boolean | undefined;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center space-x-3">
      {icon}
      <p className="text-lg font-medium text-gray-700">{label}</p>
    </div>
    <p className="text-lg text-gray-800 font-semibold">{String(value)}</p>
  </div>
);

export default UserProfilePage;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { updateUser } from '@/services/users'; 
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';
import CustomButton from '@/components/shared/CustomButton';
import { updateUserCookie } from '@/app/actions/updateUserCookie';
import Loading from '@/components/shared/Loading';
import { getCurrentUser } from '@/services/AuthService';
import Image from "next/image";

const UpdateUserProfilePage = () => {
  const { user, isLoading, setUser } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        image: user.image || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value,}));
  };

  const handleSave = async () => {
    if (!user?._id) return;

    const token = localStorage.getItem("authToken")

    if (!token) {
      toast.error("Auth token not found");
      return;
    }

    try {
      const res = await updateUser(user._id, formData, token);
      toast.success('Profile updated');
      setEditing(false);

      //* Update the user context with the new name & await for SSR
      await updateUserCookie({
        ...user,             // keep existing user fields
        name: formData.name,  // update if only the changed name 
        image: formData.image // update if only the changed image
      });

      //* Re-sync context from updated cookie/server
      const updatedUser = await getCurrentUser();
      if (updatedUser) {
        setUser(updatedUser.userData);
      }
    } catch {
      toast.error('Update failed');
    }
  };

  if (isLoading || !user) return <div className="p-8"><Loading /></div>;

  return (
    <div className="w-full mx-auto p-8 bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl font-semibold text-center text-[#4F46E5] mb-6">
        Update {user?.name || "User"}&apos;s Profile
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
          value={formData.name} 
          name="name"
          editing={editing} 
          handleChange={handleChange}
        />
        <ProfileField 
          label="Image URL" 
          value={formData.image} 
          name="image"
          editing={editing} 
          handleChange={handleChange}
        />
        <ProfileField 
          label="Email" 
          value={formData.email} 
          name="email"
          editing={false} 
          handleChange={handleChange}
          disabled={true}
        />

        {!editing ? (
          <div className="flex justify-center">
            <CustomButton
              textName='Edit Profile'
              handleAnything={() => setEditing(true)}

            />
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:bg-green-700 hover:scale-105"
            >
              Save
            </button>
            <button
              onClick={() => {
                setFormData({ name: user.name, email: user.email, image: user.image || '' });
                setEditing(false);
              }}
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition duration-300 transform hover:bg-gray-400 hover:scale-105"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileField = ({
  label,
  value,
  name,
  editing,
  handleChange,
  disabled = false
}: {
  label: string;
  value: string;
  name: string;
  editing: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <input
      type={name === 'email' ? 'email' : 'text'}
      name={name}
      value={value}
      onChange={handleChange}
      disabled={!editing || disabled}
      className={`w-full border ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
  </div>
);

export default UpdateUserProfilePage;

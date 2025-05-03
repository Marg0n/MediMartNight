/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { updateUser } from '@/services/users'; 
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';
import CustomButton from '@/components/shared/CustomButton';

const UpdateUserProfilePage = () => {
  const { user, isLoading } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    } catch {
      toast.error('Update failed');
    }
  };

  if (isLoading || !user) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Update User Profile</h1>

      <div className="space-y-6">
        <ProfileField 
          label="Name" 
          value={formData.name} 
          name="name"
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
                setFormData({ name: user.name, email: user.email });
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

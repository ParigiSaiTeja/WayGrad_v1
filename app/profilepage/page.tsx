'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface UserProfile {
  name: string;
  phonenumber: string;
  university: string;
  email: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phonenumber: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/profile');
        setUser(data);
        setFormData({
          name: data.name || '',
          phonenumber: data.phonenumber || '',
        });
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        name: user.name,
        phonenumber: user.phonenumber,
      });
    }
  };

  const handleSave = async () => {
    try {
      await axios.put('/api/updateprofile', formData);
      setUser((prevUser) =>
        prevUser
          ? {
              ...prevUser,
              ...formData,
            }
          : null
      );
      setIsEditing(false);
      toast.success('Profile Updated');
    } catch (err) {
      setError('Failed to update profile');
      toast.error('Please try again');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold">Email:</label>
          <p>{user.email}</p>
        </div>
        <div>
          <label className="block font-semibold">University:</label>
          <p>{user.university}</p>
        </div>
        <div>
          <label className="block font-semibold">Phone Number:</label>
          {isEditing ? (
            <input
              type="tel"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          ) : (
            <p>{user.phonenumber}</p>
          )}
        </div>
        {isEditing ? (
          <div className="flex justify-between mt-4 mb-10">
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white p-2 mb-10 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-black text-white p-2 mb-10 rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-black text-white p-3 rounded-md w-full mb-100"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

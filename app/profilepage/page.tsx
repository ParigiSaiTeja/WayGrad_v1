'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Input from '../components/inputs/Input'; // Adjust the path to your Input component

type FormValues = {
  name: string;
  phonenumber: string;
};

const ProfilePage: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: '',
      phonenumber: '',
    },
  });

  const [userDetails, setUserDetails] = useState<{ name: string; phonenumber: string; email: string; university: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch user details on component mount
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/api/profileuser'); // Your API endpoint to get user details
        const { name, phonenumber, email, university } = response.data;
        setValue('name', name);
        setValue('phonenumber', phonenumber);
        setUserDetails({ name, phonenumber, email, university });
      } catch (error) {
        toast.error('Failed to fetch user details.');
      }
    };

    fetchUserDetails();
  }, [setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.put('/api/updateprofile', data); // Your API endpoint to update user details
      toast.success('Profile updated successfully.');
    } catch (error) {
      toast.error('Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userDetails) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <p className="text-gray-600">{userDetails.email}</p>
        </div>
        <div>
          <label className="block text-gray-700">University</label>
          <p className="text-gray-600">{userDetails.university}</p>
        </div>
        <Input
          id="name"
          label="Name"
          type="text"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="phonenumber"
          label="WhatsApp Phone Number"
          type="text"
          register={register}
          errors={errors}
          required
          pattern="^\+?\d{10,}$"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;

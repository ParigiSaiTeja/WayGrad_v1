'use client';

import useForgotPasswordModal from '@/app/hooks/useForgotPasswordModal'; // Import the hook
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Input from '../inputs/Input';
import Modal from './Modal';

const ForgotPasswordModal: React.FC = () => {
  const forgotPasswordModal = useForgotPasswordModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'reset'>('email'); // Track the current step

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmitEmail: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    fetch('/api/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(false);
        if (result.exists) {
          setStep('reset'); // Move to the password reset step
        } else {
          toast.error(result.message);
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Something went wrong');
      });
  };

  const onSubmitReset: SubmitHandler<FieldValues> = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: watch('email'),
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(false);
        if (result.success) {
          toast.success('Password reset successfully');
          forgotPasswordModal.onClose();
        } else {
          toast.error(result.message);
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Something went wrong');
      });
  };

  const bodyContent = step === 'email' ? (
    <div className="flex flex-col gap-4">
      <Input
        id="email"
        label="Enter your .edu Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      <Input
        id="password"
        label="New Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="confirmPassword"
        label="Confirm New Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={forgotPasswordModal.isOpen}
      onClose={forgotPasswordModal.onClose}
      title={step === 'email' ? "Forgot Password" : "Reset Password"}
      actionLabel={step === 'email' ? "Send Reset Link" : "Reset Password"}
      onSubmit={handleSubmit(step === 'email' ? onSubmitEmail : onSubmitReset)}
      body={bodyContent}
    />
  );
};

export default ForgotPasswordModal;

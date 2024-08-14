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
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email'); // Track the current step
  const [email, setEmail] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      otp: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmitEmail: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // Check if email exists and send OTP
    fetch('/api/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'Email not found') {
          setIsLoading(false);
          toast.error(result.message);
        } else {
          // Email exists, send OTP
          toast.success("OTP sent to your email")
          fetch('/api/password_otp_send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: data.email }),
          })
            .then((res) => res.json())
            .then((result) => {
              setIsLoading(false);
              if (result.message === 'OTP sent successfully') {
                setEmail(data.email);
                setStep('otp'); // Move to OTP verification step
              } else {
                toast.error(result.message);
              }
            })
            .catch(() => {
              setIsLoading(false);
              toast.error('Something went wrong');
            });
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Something went wrong');
      });
  };

  const onSubmitOtp: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    fetch('/api/password_otp_verfiy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp: data.otp }),
    })
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(false);
        if (result.message === 'OTP verified') {
          setStep('reset'); // Move to password reset step
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
        email,
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
  ) : step === 'otp' ? (
    <div className="flex flex-col gap-4">
      <Input
        id="otp"
        label="Enter OTP"
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
      title={step === 'email' ? "Forgot Password" : step === 'otp' ? "Verify OTP" : "Reset Password"}
      actionLabel={step === 'email' ? "Send OTP" : step === 'otp' ? "Verify OTP" : "Reset Password"}
      onSubmit={handleSubmit(step === 'email' ? onSubmitEmail : step === 'otp' ? onSubmitOtp : onSubmitReset)}
      body={bodyContent}
    />
  );
};

export default ForgotPasswordModal;

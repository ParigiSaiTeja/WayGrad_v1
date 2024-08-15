'use client';
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Control, FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useForgotPasswordModal from '../../hooks/useForgotPasswordModal';
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: any;
  required?: boolean;
  options?: { value: string; label: string }[]; // For Select component
  control?: Control<FieldValues>; // For Select component
  pattern?: string; // For input pattern validation
};

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const forgotPasswordModal = useForgotPasswordModal();
  
  const [isLoading, setIsLoading] = useState(false);
  const [universities, setUniversities] = useState<{ value: string; label: string }[]>([]);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const [isOtpSent, setIsOtpSent] = useState(false);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('/universitylist.txt');
        const text = await response.text();
        const universityList = text.split('\n').map(line => line.trim()).filter(line => line);
        const universityOptions = universityList.map(uni => ({ value: uni, label: uni }));
        setUniversities(universityOptions);
      } catch (error) {
        console.error('Failed to load universities', error);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await fetch('/cities.txt');
        const text = await response.text();
        const cityList = text.split('\n').map(line => line.trim()).filter(line => line);
        const cityOptions = cityList.map(city => ({ value: city, label: city }));
        setCities(cityOptions);
      } catch (error) {
        console.error('Failed to load cities', error);
      }
    };

    fetchUniversities();
    fetchCities();
  }, []);

  const { 
    register, 
    handleSubmit,
    control,
    watch,
    formState: {
      errors,
      isValid,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      phonenumber: '',
      university: '',
      password: '',
      otp: '', // Ensure otp field is included
      terms: false, // Add a default value for the terms checkbox
    },
    mode: "onChange", // Ensure validation is checked on change
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    shouldFocusError: true,
  });

  const checkEmailExistence = async (email: string) => {
    try {
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      return result.exists;
    } catch (error) {
      console.error("Error checking email existence:", error);
      toast.error("Failed to check email existence");
      return false;
    }
  };

  const onSendOtp: SubmitHandler<FieldValues> = async (data) => {
    if (!isValid) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    // Check if terms are accepted
    if (!data.terms) {
      toast.error('You must agree to the terms and conditions.');
      return;
    }
    
    setIsLoading(true);
    try {
      const emailExists = await checkEmailExistence(data.email);
      if (emailExists) {
        toast.error('An account already exists with this email.');
        setIsLoading(false);
        return;
      }
  
      // Call API to send OTP
      const response = await axios.post('/api/register', { email: data.email });
      if (response.data.otp) {
        setIsOtpSent(true);
        toast.success('OTP sent to your email.');
        toast.success('Check your spam folder if you didn’t receive the email.');
      } else {
        toast.error('Failed to send OTP.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred while sending OTP.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const onVerifyOtp: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/register', { ...data, otp: data.otp }); // Verify OTP with the server
      // Automatically log in the user after successful registration
      await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      toast.success('Registration successful.');
      registerModal.onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  }

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const handleBack = () => {
    setIsOtpSent(false); // Switch back to the registration form
  };
  const onForgotPassword = useCallback(() => {
    loginModal.onClose();
    forgotPasswordModal.onOpen();
  }, [loginModal, forgotPasswordModal]);

  const bodyContent = isOtpSent ? (
    <div className="flex flex-col gap-4">
      <Heading title="Verify OTP" subtitle="Enter the OTP sent to your email." />
      <Input
        id="otp"
        label="Enter OTP"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      
      {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
      <button
        type="button"
        className="mt-4 text-black-500 hover:underline"
        onClick={handleBack}
      >
        Back
      </button>
    </div>
  ) : (
    <div className="flex flex-col gap-3">
      <Heading title="Welcome to WayGrad" subtitle="Create an account!" />
      <Input
        id="email"
        label="Enter your .edu email"
        disabled={isLoading} 
        register={register}
        errors={errors}
        required
        type="email"
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="phonenumber"
        label="WhatsApp Number - Include country code"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        pattern="^[+0-9]{10,}$" // Add pattern attribute to restrict input
      />
         <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        pattern=".{6,}" // Ensure password is at least 6 characters
      />
      <Input
        id="university"
        label="University"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        options={universities}
        control={control}
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          {...register("terms", { required: true })}
          className="form-checkbox"
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          I agree to the <a href="https://aqua-fancy-8.tiiny.site" target="_blank" className="underline">terms and conditions</a>
        </label>
      </div>
      {errors.terms && <p className="text-red-500">You must agree to the terms and conditions.</p>}
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
       <p>
          <span 
            onClick={onForgotPassword} 
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Forgot Password?
          </span>
        </p>
        <p>Already have an account?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          > Log in</span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title={isOtpSent ? "Verify OTP" : "Register"}
      actionLabel={isOtpSent ? "Verify OTP" : "Send OTP"}
      onClose={registerModal.onClose}
      onSubmit={isOtpSent ? handleSubmit(onVerifyOtp) : handleSubmit(onSendOtp)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;

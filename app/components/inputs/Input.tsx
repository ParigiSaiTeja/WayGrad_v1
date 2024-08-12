import React from "react";
import { Control, Controller, FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import Select from "react-select";

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  control?: Control<T>;
  errors: FieldErrors<T>;
  minLength?: number;
  maxLength?: number;
  options?: { value: string; label: string }[];
  pattern?: string | RegExp;
}

const Input = <T extends FieldValues>({
  id,
  label,
  type = "text",
  disabled = false,
  formatPrice = false,
  register,
  required = false,
  errors,
  options,
  minLength,
  maxLength,
  control,
  pattern
}: InputProps<T>) => {
  const renderInput = () => (
    <input
      id={id}
      disabled={disabled}
      {...register(id, {
        required: required ? "This field is required" : false,
        minLength: id === "password" ? {
          value: minLength || 6,
          message: `Password must be at least ${minLength || 6} characters long`
        } : minLength ? {
          value: minLength,
          message: `Input must be at least ${minLength} characters long`
        } : undefined,
        maxLength: maxLength ? {
          value: maxLength,
          message: `Input must be no more than ${maxLength} characters long`
        } : undefined,
        pattern: pattern ? {
          value: typeof pattern === 'string' ? new RegExp(pattern) : pattern,
          message: "Invalid format"
        } : undefined,
      })}
      placeholder=" "
      type={type}
      className={`
        peer
        w-full
        p-4
        pt-6
        font-light
        bg-white
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${formatPrice ? 'pl-9' : 'pl-4'}
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
      `}
    />
  );

  const renderSelect = () => (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          isDisabled={disabled}
          options={options}
          value={options?.find(option => option.value === field.value)}
          onChange={(val) => field.onChange(val?.value)}
          classNamePrefix="react-select"
          className={`react-select-container ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}`}
          placeholder=""
          styles={{
            control: (provided) => ({
              ...provided,
              paddingTop: '20px',
              borderColor: errors[id] ? '#f87171' : '#d1d5db',
              '&:hover': {
                borderColor: errors[id] ? '#f87171' : '#374151'
              }
            }),
            placeholder: (provided) => ({
              ...provided,
              transform: 'translateY(-16px)',
              fontSize: '0.875rem'
            }),
            valueContainer: (provided) => ({
              ...provided,
              paddingTop: '4px',
              paddingBottom: '4px'
            }),
          }}
        />
      )}
    />
  );

  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      {options ? renderSelect() : renderInput()}
      <label
        htmlFor={id}
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
          cursor-pointer
        `}
      >
        {label}
      </label>
      {errors[id]?.message && (
        <p className="text-rose-500 text-sm mt-1">
         
        </p>
      )}
    </div>
  );
};

export default Input;

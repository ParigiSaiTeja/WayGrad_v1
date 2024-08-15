'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import { categories } from '../navbar/Categories';
import Modal from './Modal';

enum STEPS {
  CATEGORY = 0,
  IMAGES = 1,
  PRICE_LOCATION = 2, // Renamed step to reflect additional input
  POST_TYPE = 3,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      imageSrc: [],
      price: 1,
      title: 'Yes',
      isBid: false,
      locationValue: '', // New field for location
    }
  });

  const category = watch('category');
  const imageSrc = watch('imageSrc');
  const isBid = watch('isBid');
  const locationValue = watch('locationValue'); // Watch the new field

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };

  const onBack = () => {
    setStep(prev => prev - 1);
  };

  const onNext = () => {
    setStep(prev => prev + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.POST_TYPE) {
      return onNext();
    }

    setIsLoading(true);

    axios.post('/api/listings', {
      ...data,
      description: 'This is a randomly assigned description.',
      city: 'Random City',
      isBid: data.isBid,
      locationValue: data.locationValue, // Include location in the data
    })
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    return step === STEPS.POST_TYPE ? 'Create' : 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.CATEGORY ? undefined : 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your item?"
        subtitle="Pick a category"
      />
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={() => setCustomValue('category', item.label)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8 text-center">
        <Heading
          title="Add photos of your item"
          subtitle={
            <div style={{ textAlign: 'center' }}>
              Show buyers what your item looks like!
             
            </div>
          }
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
        <Input
          id="amazonLink"
          label="Original Amazon Link (optional)"
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE_LOCATION) { // Updated step to include location
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Set your price and location"
          subtitle="Enter the price and the address of the item"
        />
        <Input
          id="price"
          label="Price"
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          prefix="$"
        />
        <Input
          id="locationValue"
          label="This input will be visible to other users"
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.POST_TYPE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
  <Heading
    title="Create Your Listing"
    subtitle="What type of post would you like to create?"
  />
  <div className="flex justify-between items-center">
    <label className="mr-4">Bidding</label>
    <input
      type="radio"
      name="postType"
      value="bidding"
      checked={isBid}
      onChange={() => setCustomValue('isBid', true)}
      className="toggle-input"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="mr-4">Regular Listing</label>
    <input
      type="radio"
      name="postType"
      value="listing"
      checked={!isBid}
      onChange={() => setCustomValue('isBid', false)}
      className="toggle-input"
    />
  </div>
  
  <p className="text-sm text-gray-500">
    {isBid
      ? 'Your item will be available for bidding. Buyers can place bids, and you can choose among them.'
      : 'Your item will be listed at a fixed price for immediate purchase.'}
  </p>
</div>

    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="List your item"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}

export default RentModal;

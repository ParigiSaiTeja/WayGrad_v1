'use client';

import axios from 'axios';
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Heading from '../Heading';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Select from '../inputs/Select';
import Modal from './Modal';

enum STEPS {
  INTRO = 0, // Combined step for GENDER, ROOM_TYPE, LEASE_TYPE, UTILITIES, and date fields
  LOCATION = 1,
  IMAGES = 2,
  DESCRIPTION = 3,
  PRICE = 4,
}

interface SubletModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: (data: FieldValues) => void;
}

const SubletModal: React.FC<SubletModalProps> = ({ isOpen, onClose, step, onBack, onNext, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      gender: 'Any', // Default value
      location: '', // Initialize as an empty string for direct input
      roomType: 'Private', // Default value
      leaseType: 'Short term', // Default value
      price: 1,
      utilities: 'No', // Default value
      guestCount: Math.floor(Math.random() * 5) + 1, // Assign random value between 1 and 5
      roomCount: Math.floor(Math.random() * 5) + 1, // Assign random value between 1 and 5
      bathroomCount: Math.floor(Math.random() * 5) + 1, // Assign random value between 1 and 5
      imageSrc: [], // Initialize as an array for multiple images
      description: '',
      startingFrom: '',
      tillDate: '',
    }
  });

  const location = watch('location');
  const gender = watch('gender');
  const roomType = watch('roomType');
  const leaseType = watch('leaseType');
  const price = watch('price');
  const utilities = watch('utilities');
  const imageSrc = watch('imageSrc');
  const description = watch('description');
  const startingFrom = watch('startingFrom');
  const tillDate = watch('tillDate');

  

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };

  const actionLabel = useMemo(() => step === STEPS.PRICE ? 'Create' : 'Next', [step]);
  const secondaryActionLabel = useMemo(() => step === STEPS.INTRO ? undefined : 'Back', [step]);

  const onNextStep = () => {
    if (step === STEPS.INTRO) {
      if (!gender || !roomType || !leaseType || !utilities || !startingFrom || !tillDate) {
        toast.error('Please fill out all fields in this step.');
        return;
      }
    }
    onNext();
  };

  const onSubmitHandler: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNextStep();
    }

    setIsLoading(true);

    try {
      await axios.post('/api/subleaselistings', data);
      toast.success('Sublet created! Now you can share this sublet from my sublets', { duration: 5000 });
      reset();
      onClose();
    } catch (error) {
      toast.error('Something went wrong.', { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Provide details about your place"
        subtitle="Please fill in the information below"
      />
      <div>
        <label className="block text-lg font-semibold"></label>
        <Select
          id="gender"
          options={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Any', label: 'Any' }
          ]}
          value={gender}
          onChange={(value) => setCustomValue('gender', value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-lg font-semibold"> </label>
        <Select
          id="roomType"
          options={[
            { value: 'Private', label: 'Private' },
            { value: 'Shared', label: 'Shared' }
          ]}
          value={roomType}
          onChange={(value) => setCustomValue('roomType', value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-lg font-semibold"></label>
        <Select
          id="leaseType"
          options={[
            { value: 'Short term', label: 'Short term' },
            { value: 'Long term', label: 'Long term' },
            { value: 'Short term can be extended to long term', label: 'Short term can be extended to long term' }
          ]}
          value={leaseType}
          onChange={(value) => setCustomValue('leaseType', value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-lg font-semibold"></label>
        <Select
          id="utilities"
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' }
          ]}
          value={utilities}
          onChange={(value) => setCustomValue('utilities', value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-lg font-semibold"></label>
        <Input
          id="startingFrom"
          type="date"
          disabled={isLoading}
          register={register}
          errors={errors}
          required label={''}        />
      </div>
      <div>
        <label className="block text-lg font-semibold"></label>
        <Input
          id="tillDate"
          type="date"
          disabled={isLoading}
          register={register}
          errors={errors}
          required label={''}        />
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help subletters find you!"
        />
        <Input
          id="location"
          label="Location"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        {/* You can remove the Map component or keep it if you want to provide a visual aid */}
        {/* <Map center={location ? { lat: parseFloat(location.lat), lng: parseFloat(location.lng) } : undefined} /> */}
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add photos of your place"
          subtitle="Show potential subletters what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Describe your place"
          subtitle="Provide a detailed description of your place"
        />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per month?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Sublet Your Place"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmitHandler)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.INTRO ? undefined : onBack}
      onClose={onClose}
      body={bodyContent}
      // Add this line
    />
  );
}

export default SubletModal;

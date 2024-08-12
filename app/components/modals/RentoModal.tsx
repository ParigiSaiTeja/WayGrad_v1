'use client';

import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import CitySelect from '../inputs/CitySelect';
import Input from '../inputs/Input';
import Modal from './Modal';

enum STEPS {
  LOCATION = 1,
  PRICE = 2,
}

const SubletModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
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
      location: null,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const location = watch('location');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), []);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };

  const onBack = () => {
    rentModal.setStep(STEPS.LOCATION); // Ensure it goes back to LOCATION
  };

  const onNext = () => {
    if (rentModal.step === STEPS.LOCATION) {
      rentModal.setStep(STEPS.PRICE);
    } else {
      onSubmit({});
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (rentModal.step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios.post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        rentModal.setStep(STEPS.LOCATION); // Reset to LOCATION
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
    return rentModal.step === STEPS.PRICE ? 'Create' : 'Next';
  }, [rentModal.step]);

  const secondaryActionLabel = useMemo(() => {
    return rentModal.step === STEPS.LOCATION ? undefined : 'Back';
  }, [rentModal.step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located?"
        subtitle="Help guests find you!"
      />
      <CitySelect 
        value={location} 
        onChange={(value) => setCustomValue('location', value)} 
      />
      <Map center={location?.latlng} />
    </div>
  );

  if (rentModal.step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
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
      isOpen={rentModal.isOpen}
      title="Sublet Details"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={rentModal.step === STEPS.LOCATION ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}

export default SubletModal;

import { useMutation } from "@apollo/client";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "../../../../components/Button";
import Notification from '../../../../components/notification';
import '../category/new_transaction/new_transaction.scss';
import { MUTATION_UPDATE_USER_PROFILE } from "./graphql/mutations";


const Modal = React.lazy(() => (import('../../../../components/modal')));

const FormTextInput = ({ name, control, label, type, rules }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true, ...rules }}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <TextField
          required
          id="outlined-required"
          label={label}
          value={value || ''}
          onChange={onChange}
          className="textField"
          type={type}
          error={errors[name] && Boolean(errors[name])}
          helperText={errors[name] && "This field is required"}
        />)}
    />
  );
}

const EditProfile = ({ isOpen, closeModal, data, loginUser }) => {
  const { handleSubmit, reset, control, setValue } = useForm();
  const [updateUserProfile] = useMutation(MUTATION_UPDATE_USER_PROFILE);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationError, setNotificationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = (newData) => {
    setIsSubmitting(true);
    updateUserProfile({
      variables: {
        data: {
          ...newData,
          phone: parseInt(newData.phone)
        }
      },
      onCompleted: async (newUser) => {
        setNotificationError('');
        setNotificationOpen(true);
        closeModal();
        reset();
        setIsSubmitting(false);

        const { token, user } = newUser.updateUserDetails;
        loginUser(user, token);
      },
      onError: (err) => {
        setNotificationError(err.message);
        setNotificationOpen(true);
        setIsSubmitting(false);
      },
    });
  };

  useEffect(() => {
    const splitNames = () => {
      if (!data?.name) return ['', ''];
      return data.name.split(' ');
    }

    setValue('firstName', splitNames()[0] || '');
    setValue('lastName', splitNames()[1] || '');
    setValue('location', data?.location);
    setValue('phone', data?.phone?.number);
  }, [data, setValue]);

  return (
    <Modal className='new-transaction-container' isOpen={isOpen} closeModal={closeModal}>
      <Notification severity={notificationError ? 'error' : 'success'} show={notificationOpen}
        setShow={setNotificationOpen} description={notificationError || 'Updated successfully'} />
      <div>
        <div className="mb-40">
          <p className="fw-bold fs-1-2 text-gradient">Add new dial</p>
        </div>

        <form>
          <div className="input-container mb-20">
            <FormTextInput name='firstName' control={control}
              label='First Name' type='text'
            />
          </div>
          <div className="input-container mb-20">
            <FormTextInput name='lastName' control={control}
              label='Last Name' type='text'
            />
          </div>
          <div className="input-container mb-20">
            <FormTextInput name='phone' control={control}
              label='Phone number' type='number'
            />
          </div>
          <div className="input-container mb-20">
            <FormTextInput name='location' control={control}
              label='Your location' type='text'
            />
          </div>
          <div className="m-tb-30">
            <CustomButton classes='button' loading={isSubmitting} onClick={handleSubmit(submitForm)}>
              Update profile
            </CustomButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfile;

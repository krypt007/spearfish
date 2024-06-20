import { useMutation } from "@apollo/client";
import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "../../../../components/Button";
import Notification from '../../../../components/notification';
import '../category/new_transaction/new_transaction.scss';
import { MUTATION_UPDATE_BUDGET } from "./graphql/mutation";
import { QUERY_MY_BUDGETS } from './graphql/queries';


const Modal = React.lazy(() => (import('../../../../components/modal')));

const FormTextInput = ({ name, control, label, type, rules, data }) => {
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

const EditBudget = ({ isOpen, closeModal, data }) => {
  const { handleSubmit, reset, control, setValue } = useForm();
  const [updateBudget] = useMutation(MUTATION_UPDATE_BUDGET);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationError, setNotificationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = (newData) => {
    setIsSubmitting(true);
    updateBudget({
      variables: {
        editBudgetId: data.id,
        data: {
          ...newData, amount: parseInt(newData.amount)
        }
      },
      onCompleted: () => {
        setNotificationError('');
        setNotificationOpen(true);
        closeModal();
        setIsSubmitting(false);
        reset();
      },
      onError: (err) => {
        setNotificationError(err.message);
        setNotificationOpen(true);
        setIsSubmitting(false);
      },
      refetchQueries: [
        {
          query: QUERY_MY_BUDGETS,
          variables: {
            query: {
              _id: data._id
            }
          }
        }
      ]
    });
  };

  useEffect(() => {
    setValue('name', data?.name);
    setValue('amount', data?.amount);
  }, [data, setValue]);

  return (
    <Modal className='new-transaction-container' isOpen={isOpen} closeModal={closeModal}>
      <Notification severity={notificationError ? 'error' : 'success'} show={notificationOpen}
        setShow={setNotificationOpen} description={notificationError || 'Updated successfully'} />
      <div>
        <div className="mb-20">
          <p className="fw-bold fs-1-2 text-gradient">Edit sub dial</p>
          <p className="fs-0-7">Edit values for the current dial</p>
        </div>

        <form>
          <div className="input-container mb-20">
            <FormTextInput name='name' control={control}
              label='Name' type='text' data={data}
            />
          </div>
          <div className="input-container mb-20">
            <FormTextInput name='amount' control={control} data={data}
              label='Amount' type='number' rules={{ min: 1 }}
            />
          </div>
          <div className="m-tb-30">
            <CustomButton classes='button' loading={isSubmitting} onClick={handleSubmit(submitForm)}>
              Edit sub dial
            </CustomButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditBudget;

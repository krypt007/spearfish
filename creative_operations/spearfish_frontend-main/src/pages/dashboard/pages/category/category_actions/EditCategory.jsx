import { useMutation } from "@apollo/client";
import { capitalize, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CustomButton from "../../../../../components/Button";
import Notification from '../../../../../components/notification';
import { QUERY_GET_BUDGET } from "../../budget/graphql/queries";
import { QUERY_GET_CATEGORIES_IN_BUDGET } from "../../categories/graphql/queries";
import { MUTATION_UPDATE_CATEGORY } from "../graphql/mutations";
import { QUERY_GET_CATEGORY } from "../graphql/queries";
import '../new_transaction/new_transaction.scss';


const Modal = React.lazy(() => (import('../../../../../components/modal')));

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
          value={value || (data && data[name]) || ''}
          onChange={onChange}
          className="textField"
          type={type}
          error={errors[name] && Boolean(errors[name])}
          helperText={errors[name] && "This field is required"}
        />)}
    />
  );
}

const EditCategory = ({ isOpen, closeModal, data }) => {
  const { handleSubmit, reset, control, setValue } = useForm();
  const { budget_id, dial_id } = useParams();
  const [updateCategory] = useMutation(MUTATION_UPDATE_CATEGORY);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationError, setNotificationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = (newData) => {
    setIsSubmitting(true);
    updateCategory({
      variables: {
        query: {
          budgetId: budget_id,
          categoryId: dial_id
        },
        data: {
          ...newData,
          amount: parseInt(newData.amount)
        }
      },
      onCompleted: () => {
        setNotificationError('');
        setNotificationOpen(true);
        closeModal();
        reset();
        setIsSubmitting(false);
      },
      onError: (err) => {
        setNotificationError(err.message);
        setNotificationOpen(true);
        setIsSubmitting(false);
      },
      refetchQueries: [
        {
          query: QUERY_GET_CATEGORY,
          variables: {
            budgetId: budget_id, categoryId: dial_id
          }
        },
        {
          query: QUERY_GET_CATEGORIES_IN_BUDGET,
          variables: {
            budgetId: budget_id
          }
        },
        {
          query: QUERY_GET_BUDGET,
          variables: {
            query: {
              _id: budget_id
            }
          }
        }
      ]
    });
  };

  useEffect(() => {
    setValue('amount', data?.amount);
  }, [data, setValue]);

  return (
    <Modal className='new-transaction-container' isOpen={isOpen} closeModal={closeModal}>
      <Notification severity={notificationError ? 'error' : 'success'} show={notificationOpen}
        setShow={setNotificationOpen} description={notificationError || 'Updated successfully'} />
      <div>
        <div className="mb-40">
          <p className="fw-bold fs-1-2 text-gradient">Edit sub dial</p>
          <p className="fs-0-7 dull-black-2 fw-500">{capitalize(data.category.name)} dial values</p>
        </div>

        <form>
          {/* <div className="input-container mb-20">
            <FormTextInput name='title' control={control}
              label='Title' type='text' data={data}
            />
          </div> */}
          <div className="input-container mb-20">
            <FormTextInput name='amount' control={control}
              label='Amount' type='number' data={data}
            />
          </div>
          <div className="m-tb-30">
            <CustomButton classes='button' loading={isSubmitting} onClick={handleSubmit(submitForm)}>
              Edit dial
            </CustomButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditCategory;

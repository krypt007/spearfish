import { useMutation } from "@apollo/client";
import { TextField } from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CustomButton from "../../../../../components/Button";
import Notification from '../../../../../components/notification';
import { QUERY_GET_BUDGET } from "../../budget/graphql/queries";
import { QUERY_GET_CATEGORIES_IN_BUDGET } from "../../categories/graphql/queries";
import { MUTATION_UPDATE_CATEGORY_TRANSACTION } from "../graphql/mutations";
import { QUERY_GET_CATEGORY, QUERY_GET_CATEGORY_TRANSACTIONS } from "../graphql/queries";
import { QUERY_GET_RECENT_ACTIVITIES } from "../../../sections/right_bar/graphql/queries";
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

const DateInput = ({ name, control, label, data }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <MobileDatePicker
            required
            label={label}
            inputFormat="MM/DD/YYYY"
            disableFuture={true}
            value={value || (data && moment(data['date'])) || moment()}
            onChange={onChange}
            className="textField"
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />
    </LocalizationProvider>
  )
}

const EditTransaction = ({ isOpen, closeModal, data }) => {
  const { handleSubmit, reset, control, setValue } = useForm();
  const { budget_id, dial_id } = useParams();
  const [createCategoryTransaction] = useMutation(MUTATION_UPDATE_CATEGORY_TRANSACTION);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationError, setNotificationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = (newData) => {
    setIsSubmitting(true);
    createCategoryTransaction({
      variables: {
        data: {
          category_id: dial_id,
          transaction_id: data.id,
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
          query: QUERY_GET_CATEGORY_TRANSACTIONS,
          variables: {
            data: {
              budget_id,
              category_id: dial_id
            }
          }
        },
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
        },
        {
          query: QUERY_GET_RECENT_ACTIVITIES
        }
      ]
    });
  };

  useEffect(() => {
    setValue('title', data?.title);
    setValue('description', data?.description);
    setValue('amount', data?.amount);
    setValue('date', (data && moment(data.date)));
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
            <FormTextInput name='title' control={control}
              label='Title' type='text' data={data}
            />
          </div>
          <div className="input-container mb-20">
            <FormTextInput name='description' control={control}
              label='Description' type='text' data={data}
            />
          </div>
          <div className="input-container mb-20">
            <FormTextInput name='amount' control={control} data={data}
              label='Amount' type='number' rules={{ min: 1 }}
            />
          </div>
          <div className="input-container m-tb-10">
            <DateInput name='date' control={control} label='Date' data={data} />
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

export default EditTransaction;

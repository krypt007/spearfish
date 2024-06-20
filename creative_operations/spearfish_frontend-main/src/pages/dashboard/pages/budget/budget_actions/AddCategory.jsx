import { useMutation, useQuery } from "@apollo/client";
import { capitalize, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CustomButton from "../../../../../components/Button";
import Notification from '../../../../../components/notification';
import { QUERY_GET_BUDGET } from "../../budget/graphql/queries";
import { QUERY_DEFAULT_CATEGORIES } from '../../budgets/new_budget/graphql/queries';
import { QUERY_GET_CATEGORIES_IN_BUDGET } from "../../categories/graphql/queries";
import '../../category/new_transaction/new_transaction.scss';
import { MUTATION_ADD_CATEGORY_TO_BUDGET } from "../graphql/mutations";


const Modal = React.lazy(() => (import('../../../../../components/modal')));

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

const FormSelectInput = ({ name, control, label, type, rules, children }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true, ...rules }}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <TextField
          select
          fullWidth
          required
          id="outlined-required"
          label={label}
          value={value || ''}
          onChange={onChange}
          className="textField"
          type={type}
          error={errors[name] && Boolean(errors[name])}
          helperText={errors[name] && "This field is required"}
        >{children}</TextField>)}
    />
  );
};

const AddCategory = ({ isOpen, closeModal, categoriesInBudget }) => {
  const { handleSubmit, reset, control } = useForm();
  const { id } = useParams();
  const [addCategoryToBudget] = useMutation(MUTATION_ADD_CATEGORY_TO_BUDGET);
  const { data } = useQuery(QUERY_DEFAULT_CATEGORIES);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationError, setNotificationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = (newData) => {
    setIsSubmitting(true);
    addCategoryToBudget({
      variables: {
        budgetId: id,
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
          query: QUERY_GET_CATEGORIES_IN_BUDGET,
          variables: {
            budgetId: id
          }
        },
        {
          query: QUERY_GET_BUDGET,
          variables: {
            query: {
              _id: id
            }
          }
        }
      ]
    });
  };

  const defaultCategories = data?.defaultCategories || [];

  /**
   * @method filteredCategories
   * @description filter out the categories that already exists in the current budget
   * @returns {Array} categories that can be created
   */
  const filteredCategories = () => {
    const filtered = [];
    defaultCategories.forEach((defaultCategory) => {
      if (!categoriesInBudget.includes(defaultCategory._id)) {
        filtered.push(defaultCategory);
      }
    });

    return filtered;
  }

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
            <FormSelectInput name='categoryId' control={control}
              label='Category name'>
              <MenuItem value=''>Select category</MenuItem>
              {filteredCategories().map((defaultCategory, index) => (
                <MenuItem value={defaultCategory._id} key={index}>
                  {capitalize(defaultCategory.name)}
                </MenuItem>
              ))}
            </FormSelectInput>
          </div>
          <div className="input-container mb-20">
            <FormTextInput name='amount' control={control}
              label='Amount' type='number'
            />
          </div>
          <div className="m-tb-30">
            <CustomButton classes='button' loading={isSubmitting} onClick={handleSubmit(submitForm)}>
              Add dial
            </CustomButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCategory;

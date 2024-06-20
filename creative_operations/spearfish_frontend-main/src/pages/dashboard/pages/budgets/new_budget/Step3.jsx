import { Icon } from "@iconify/react";
import { capitalize, isEmpty } from "../../../../../global/utils/helperMethods";
import { useState, useRef, useMemo } from "react";
import { useCallback, useEffect } from "react";
import { MUTATION_CREATE_BUDGET } from "./graphql/mutations";
import { QUERY_MY_BUDGETS } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import Notification from '../../../../../components/notification';
import { useNavigate } from "react-router-dom";
import { SAVINGS_PERCENTAGE } from '../../../../../global/constants';


const Step3 = ({ className, stepData, validateStep, categories, setIsSubmitting }) => {
  const step3Container = useRef(null);
  const [amounts, setAmounts] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [requestErrors, setRequestErrors] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [createBudget] = useMutation(MUTATION_CREATE_BUDGET);
  const navigate = useNavigate();
  const getCategories = useCallback(() => {
    const initial = [];
    if (stepData['step2'] !== undefined) {
      const selected = stepData['step2'];
      categories.forEach((category) => {
        if (selected.includes(category.name)) {
          initial.push(category);
        }
      });
    }
    return initial;
  }, [categories, stepData]);

  const selectedCategories = useMemo(() => getCategories(categories), [categories, getCategories]);
  const managingAmount = (stepData['step1'] && stepData['step1']['manage-amount']) || 0;
  const savings = SAVINGS_PERCENTAGE * managingAmount;
  const [availableManagingAmount, setAvailableManagingAmount] = useState(0);

  const setAmount = (e) => {
    const input = e.currentTarget;
    const name = input.name;
    const newAmounts = { ...amounts };
    newAmounts[name] = input.value;
    setFormErrors(() => ({}));

    if ((totalAmnt() - savings) > (managingAmount - savings)) {
      setFormErrors((prevState) => {
        return { ...prevState, [name]: `Can't increase amount. It'll go beyond budget.` }
      });
      setTimeout(() => {
        setFormErrors(() => ({}));
      }, 3000);
      return;
    }

    setAmounts((prevState) => {
      return { ...prevState, [name]: parseInt(input.value || 0) }
    });
  }

  const totalAmnt = () => {
    const step3Values = step3Container.current;
    const inputs = step3Values.querySelectorAll('input');
    let amount = 0;
    for (const input of inputs) {
      amount += parseInt(input.value || 0);
    }
    return amount;
  }

  const validateAmounts = () => {
    setFormErrors(() => ({}));
    setRequestErrors(() => (''));
    const container = step3Container.current;
    const inputs = container.querySelectorAll('input');
    const data = [];
    let isValid = true;

    for (const input of inputs) {
      const { name, value } = input;
      const { id } = input.dataset;
      if (isEmpty(value)) {
        setFormErrors((prev) => {
          return { ...prev, [name]: 'This field is required' }
        });
        isValid = false;
        continue;
      }
      data.push({ category: id, amount: parseInt(value) })
    }

    return { isValid, data };
  }

  const handleCreateBudget = (data) => {
    setIsSubmitting(true);
    createBudget({
      variables: {
        data
      },
      onCompleted: () => {
        // redirect to budget page
        setIsSubmitting(false);
        navigate(`/budgets`);
      },
      onError: (e) => {
        setIsSubmitting(false);
        setRequestErrors(() => (e.message));
        setShowNotification(() => (true));
      },
      refetchQueries: [
        {
          query: QUERY_MY_BUDGETS
        }
      ]
    })
  }

  const submitForm = () => {
    const { step1 } = stepData;
    const { isValid, data } = validateAmounts();

    if (!isValid) return;

    const formData = {
      amount: parseInt(step1['manage-amount']),
      name: step1['manage-description'],
      categories: data
    }

    handleCreateBudget(formData);
    return;
  }

  useEffect(() => {
    const managingAmount = (stepData['step1'] && stepData['step1']['manage-amount']) || 0;

    setAmounts((prevState) => {
      return { ...prevState, [`saving-amount`]: managingAmount * SAVINGS_PERCENTAGE }
    });
    setAvailableManagingAmount(managingAmount - savings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(stepData.step1 && stepData.step1['manage-amount'])]);

  useEffect(() => {
    let total = Object.values(amounts).reduce((prev, curr) => (prev + curr), 0);
    total -= savings;
    setAvailableManagingAmount(() => ((managingAmount - savings) - total));
  }, [amounts, managingAmount, savings]);

  validateStep[3] = submitForm;
  const notificationSeverity = isEmpty(requestErrors) ? 'success' : 'error';

  return (
    <div className={`step-3 amounts mb-20 ${className}`} ref={step3Container}>
      <Notification severity={notificationSeverity}
        description={requestErrors} show={showNotification}
        setShow={setShowNotification}
      />
      <p className='fw-bold c-secondary-1 mb-20'>Distribute the amount to the categories.</p>
      <div className="mb-20">
        <div className='flex-row space-between align-center'>
          <p className='fs-0-8'>Total Amount managing</p>
          <p className='fw-bold'>{managingAmount}</p>
        </div>
        <div className='flex-row space-between align-center'>
          <p className='fs-0-8'>Savings({SAVINGS_PERCENTAGE * 100}% of managing amount)</p>
          <p className='fw-bold'>{savings}</p>
        </div>
        <div className='flex-row space-between align-center'>
          <p className='fs-0-8 fw-600 text-gradient'>Amount available to distribute to categories</p>
          <p className='fw-bold text-gradient'>{availableManagingAmount}</p>
        </div>
      </div>

      {selectedCategories.map((category, index) => (
        <div className="categories-amount" key={index}>
          <div className='flex-row space-between align-center'>
            <div className='flex-row flex-start align-center'>
              <div className="icon flex-column-center align-center"><Icon icon={category.icon} /></div>
              <div className="name">
                <p className='fw-bold fs-0-8'>{capitalize(category.name)}</p>
              </div>
            </div>
            <div className="input-container">
              <input type="number" name={`${category.name}-amount`}
                placeholder='Amount' value={amounts[`${category.name}-amount`] || ''}
                onChange={setAmount}
                data-id={category._id}
              />
            </div>
          </div>
          {formErrors[`${category.name}-amount`] &&
            (<p className="error-txt show-error-txt">{formErrors[`${category.name}-amount`]}</p>)
          }
        </div>
      ))}
    </div>
  );
};

export default Step3;

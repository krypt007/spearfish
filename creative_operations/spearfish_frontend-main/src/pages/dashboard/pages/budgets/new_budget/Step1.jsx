import { useRef, useState } from "react";
import { isEmpty, isEmptyObject } from "../../../../../global/utils/helperMethods";

const Step1 = ({ className, validateStep, setStepData }) => {
  const stepContainer = useRef(null);
  const [errors, setErrors] = useState({});

  const clearErrors = () => {
    setErrors(() => ({}));
  }

  const validateStep1 = () => {
    const container = stepContainer.current;
    const inputs = container.querySelectorAll('input');
    const formErrors = {};

    clearErrors();

    for (const input of inputs) {
      const { name, value } = input;

      if (isEmpty(value)) {
        formErrors[name] = `This field is required`;
      }

      if (input.type === 'number' && value < 0) {
        formErrors[name] = 'Value should be greater than 0';
      }
    }

    setErrors((prevErrors) => {
      return { ...prevErrors, ...formErrors };
    });

    if (isEmptyObject(formErrors)) {
      generateStepData(inputs);
      return true;
    }
    return false;
  }

  const generateStepData = (inputs) => {
    const stepData = {}
    for (const input of inputs) {
      const { name, value } = input;
      stepData[name] = value;
    }

    setStepData((prevState) => {
      return { ...prevState, step1: stepData }
    })
  }

  validateStep[1] = validateStep1;

  return (
    <div className={`step-1 mb-30 ${className}`} ref={stepContainer}>
      <div className="input-container flex-column flex-start mb-10">
        <label htmlFor="manage-amount" className='fs-0-8 mb-10'>What amount are you managing?</label>
        <input type="number" name="manage-amount" id="manage-amount" className='fs-1-2 fw-bold' />
        {
          errors['manage-amount'] && (<p className="error-txt show-error-txt">{errors['manage-amount']}</p>)
        }

      </div>
      <div className="input-container flex-column flex-start">
        <label htmlFor="manage-description" className='fs-0-8 mb-10'>Name of this budget</label>
        <input type="text" name="manage-description" id="manage-description" />
        {
          errors['manage-description'] && (<p className="error-txt show-error-txt">{errors['manage-description']}</p>)
        }
      </div>
    </div>
  );
};

export default Step1;

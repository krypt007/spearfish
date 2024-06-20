import { Icon } from '@iconify/react';
import './new_budget.scss';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { useState } from 'react';
import { QUERY_DEFAULT_CATEGORIES } from './graphql/queries';
import { useQuery } from "@apollo/client";
import CustomButton from '../../../../../components/Button';

const NewBudget = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [stepData, setStepData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, loading, error } = useQuery(QUERY_DEFAULT_CATEGORIES);

  const validateStep = {
  };

  const steps = {
    1: { component: Step1 },
    2: { component: Step2 },
    3: { component: Step3 },
  }
  const totalSteps = Object.keys(steps).length;

  const nextComponent = (val) => {
    if (val > 0 && !validateStep[activeStep]()) return;
    if (activeStep === totalSteps && val > 0) return;
    if (activeStep === 1 && val < 0) return;
    setActiveStep((prevState) => (prevState + val));
  }

  if (loading) return (<Icon icon='line-md:loading-twotone-loop' />);
  if (error) return (<p>An error occured while fetching categories. Please refresh this page.</p>);

  const categories = data.defaultCategories;

  return (
    <div className='new-budget flex-column-center'>
      <div className="budget-div">
        <h1 className='text-gradient'>Let's manage your cash</h1>
        <p className='fs-0-8 dull-black-2 mb-50'>To create the budget we will need to setup some things first.</p>

        <form>
          <Step1 className={activeStep !== 1 && 'hidden'} validateStep={validateStep} setStepData={setStepData} />
          <Step2 className={activeStep !== 2 && 'hidden'} validateStep={validateStep} categories={categories} setStepData={setStepData} />
          <Step3 className={activeStep !== 3 && 'hidden'} validateStep={validateStep} categories={categories} stepData={stepData} setIsSubmitting={setIsSubmitting} />
          <div className='flex-row space-between align-center buttons'>
            <div>
              {activeStep > 1 && (
                <button type='button' onClick={() => nextComponent(-1)} className='flex-row-center align-center'>
                  <Icon icon='ooui:previous-ltr' className='mr-10' /> Prev
                </button>
              )}
            </div>{activeStep === totalSteps ? (
              <CustomButton loading={isSubmitting} onClick={() => nextComponent(1)}>
                <>
                  <Icon icon='uil:create-dashboard' className='mr-5' /> Create
                </>
              </CustomButton>
            ) : (
              <button type='button' onClick={() => nextComponent(1)} className='flex-row-center align-center'>
                <>
                  <Icon icon='ooui:previous-rtl' className='mr-10' /> Next
                </>
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
};

export default NewBudget;

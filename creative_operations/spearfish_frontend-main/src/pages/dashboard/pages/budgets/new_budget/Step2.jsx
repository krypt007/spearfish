import { Icon } from "@iconify/react";
import { capitalize } from '../../../../../global/utils/helperMethods';
import { useState, useEffect, useRef } from "react";

const Step2 = ({ className, validateStep, setStepData, categories }) => {
  const [formError, setFormError] = useState('');
  const container = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const selectCategory = (e) => {
    const current = e.currentTarget;
    const parent = current.parentElement;
    const input = parent.querySelector('input');
    const name = input.name;

    if (name.toLowerCase() === 'saving') return;
    parent.classList.toggle('active-checkbox');
    input.checked = parent.classList.contains('active-checkbox');

    const copySelected = [...selectedCategories];

    if (copySelected.includes(name)) {
      copySelected.splice(copySelected.indexOf(name), 1);
    } else {
      copySelected.push(name);
    }

    setSelectedCategories(() => (copySelected));
  }

  const validateStep2 = () => {
    setFormError(() => (''));
    if (selectedCategories.length === 0) {
      setFormError(() => ('Please select at least one of the categories'));
      return false;
    }

    setStepData((prevState) => {
      return { ...prevState, step2: [...selectedCategories] };
    })
    return true;
  }

  useEffect(() => {
    const mainContainer = container.current;
    const inputs = mainContainer.querySelectorAll('input');
    const copySelected = [...selectedCategories];

    for (const input of inputs) {
      const parent = input.parentNode.parentNode;
      const name = input.name;
      if (name.toLowerCase() === 'saving') {
        if (copySelected.includes(name)) continue;
        copySelected.push(name);
        parent.classList.add('active-checkbox');
        input.checked = parent.classList.contains('active-checkbox');
      };
    };
    setSelectedCategories((prev) => ([...prev, ...copySelected]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  validateStep[2] = validateStep2;

  return (
    <div className={`step-2 mb-30 ${className}`} ref={container}>
      <p className='fw-bold mb-20 c-secondary-1'>Select the categories you would like to manage</p>
      {formError !== '' && (<p className="error-txt show-error-txt">{formError}</p>)}
      {categories.map(({ name, description, icon }, index) => (
        <div className="checkbox-category-container flex-row space-between align-center mb-10" key={index}>
          <div className='flex-row flex-start details' onClick={selectCategory}>
            <div className="icon flex-column-center align-center"><Icon icon={icon} /></div>
            <div className="name">
              <p className='fw-bold fs-0-8 mb-5'>{capitalize(name)}</p>
              <p className='fs-0-8'>{capitalize(description)}</p>
            </div>
          </div>
          <div className='checkbox-container' onClick={selectCategory}>
            <input type="checkbox" name={`${name}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Step2;

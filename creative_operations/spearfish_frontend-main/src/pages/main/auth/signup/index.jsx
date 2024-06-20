import { Link } from 'react-router-dom';
import NavigationBar from '../../navigation';
import Notification from '../../../../components/notification';
import './signup.scss';
import { useState, useEffect } from 'react';
import CustomButton from '../../../../components/Button';
import { MUTATION_CREATE_USER } from './graphql/mutations';
import { useMutation } from '@apollo/client';
import { validEmail, capitalize } from '../../../../global/utils/helperMethods';

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [createUser] = useMutation(MUTATION_CREATE_USER);
  const [showErrors, setShowErrors] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  });

  useEffect(() => {
    const inputs = document.querySelectorAll('.signup-main input');
    for (const input of inputs) {
      const inputTxt = input.parentElement.querySelector('.error-txt');
      if (Object.keys(errors).includes(input.name)) {
        inputTxt.classList.add('show-error-txt');
        inputTxt.innerHTML = errors[input.name];
      } else {
        if (inputTxt !== null) {
          inputTxt.classList.remove('show-error-txt');
          inputTxt.innerHTML = '';
        }
      }
    }
  }, [errors]);

  const clearAllErrors = () => {
    setErrors(() => ({}));
  }

  const onlyLetters = (str) => {
    return /^[a-zA-Z]+$/.test(str);
  }

  const validateForm = () => {
    clearAllErrors();
    const generatedErrors = {}

    // Characters only in first name and last name
    const checkLettersOnly = ['firstName', 'lastName'];
    checkLettersOnly.forEach((check) => {
      const val = formData[check];
      if (val.trim().length !== 0 && !onlyLetters(val)) {
        generatedErrors[check] = `${capitalize(check)} should contain only letters`
      };
    }
    );

    // Passwords are the same
    if (formData['password'] !== formData['confirmPassword']) {
      const setError = `Password and confirm password should be the same`;
      generatedErrors['password'] = setError;
      generatedErrors['confirmPassword'] = setError;
    }

    const checkPasswords = ['password', 'confirmPassword'];
    checkPasswords.forEach((check) => {
      if (formData[check].length < 7) {
        generatedErrors[check] = `${capitalize(check)} should have 7 characters or more`;
      }
    });

    // Check valid email
    if (!validEmail(formData['email'])) {
      generatedErrors['email'] = `Email address is invalid`;
    }

    // Check for empties
    for (const [k, v] of Object.entries(formData)) {
      if (k === 'acceptedTerms') continue;
      if (v.trim().length === 0 || v.trim() === '') {
        generatedErrors[k] = `${capitalize(k)} is required`;
      }
    }

    // Check if theres errors
    if (Object.keys(generatedErrors).length === 0 && !formData['acceptedTerms']) {
      generatedErrors['acceptedTerms'] = `Agree to the terms before continuing.`;
    }

    setErrors((prevErrors) => {
      return { ...prevErrors, ...generatedErrors };
    });

    return Object.keys(generatedErrors).length === 0;
  }

  const submitForm = (e) => {
    if (validateForm()) {
      setIsSubmitting(() => (true));
      const submitData = { ...formData };
      delete submitData.confirmPassword;
      createUser({
        variables: {
          data: submitData
        },
        onCompleted: () => setUserCreated(() => (!userCreated)),
        onError: (e) => {
          setRequestError(() => (e.message));
          setShowErrors(() => (true));
          setIsSubmitting(() => (false));
        }
      });
    }
  }

  const setInputValue = (e) => {
    const input = e.currentTarget;
    setFormData((prevState) => {
      return { ...prevState, [input.name]: input.value };
    });
  };

  return (
    <>
      <NavigationBar includeMobileOnly={true} classes="nav-additional-styles" />
      <Notification severity={'error'} description={requestError} show={showErrors} setShow={setShowErrors} />
      <div className="signup-main flex-row space-between align-center">
        <div className='image flex-column-center align-center'>
          <div className='about-details'>
            <p className='p-big'>Start saving with as little as KES 10 and grow your savings to a
              target, each day, week ,month or year.<br />
              <span className='fs-normal fw-600'>Fill the form to continue</span>
            </p>
            <p className='fw-600 c-text-primary'>
              Join a saving community today
            </p>
          </div>
        </div>
        <div className='form-content'>
          <div className='form-content-container flex-column-center align-center'>
            {userCreated && (
              <div className='flex-row-center align-center' style={{ width: '100%', height: '80vh' }}>
                <div>
                  <h1 className='text-gradient'>Success!</h1>
                  <p className='m-tb-10'>Your account was created successfully. Please check you email for verification.</p>
                </div>
              </div>
            )}
            {!userCreated && (
              <div className='mt-20'>
                <div className='mb-30'>
                  <h1 className='text-gradient'>Get started</h1>
                  <p className='fs-0-9 dull-black-2'>Already have an account?
                    <Link to='/login' className='c-secondary-2 ml-5 fw-bold'>Login</Link></p>
                </div>

                <form method="post">
                  <div className='double-inputs flex-row space-between' style={{ gap: '10px' }}>
                    <div className='flex-column flex-start input-container'>
                      <label htmlFor="first-name">Enter first name</label>
                      <input type="text" name="firstName" id="first-name" onChange={setInputValue} />
                      <p className='error-txt'></p>
                    </div>
                    <div className='flex-column flex-start input-container'>
                      <label htmlFor="last-name">Enter last name</label>
                      <input type="text" name="lastName" id="last-name" onChange={setInputValue} />
                      <p className='error-txt'></p>
                    </div>
                  </div>
                  <div className='flex-column flex-start input-container'>
                    <label htmlFor="email">Enter your email address</label>
                    <input type="email" name="email" id="email" onChange={setInputValue} />
                    <p className='error-txt'></p>
                  </div>
                  <div className='flex-column flex-start input-container'>
                    <label htmlFor="password">Enter your password</label>
                    <input type="password" name="password" id="password" onChange={setInputValue} />
                    <p className='error-txt'></p>
                  </div>
                  <div className='flex-column flex-start input-container'>
                    <label htmlFor="confirm-password">Repeat your password</label>
                    <input type="password" name="confirmPassword" id="confirm-password" onChange={setInputValue} />
                    <p className='error-txt'></p>
                  </div>
                  <div className='m-tb-20'>
                    <input type="checkbox" name="acceptedTerms" id="accepted-terms" className='mr-10' onChange={() => {
                      setFormData((prev) => ({ ...prev, acceptedTerms: !prev.acceptedTerms }))
                    }} />
                    <label htmlFor="accepted-terms" className='fs-0-8 c-secondary-2 fw-500'>I agree to the platforms terms and conditions</label>
                    <p className='error-txt'></p>
                  </div>
                  <CustomButton onClick={submitForm} loading={isSubmitting}>
                    Create account
                  </CustomButton>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

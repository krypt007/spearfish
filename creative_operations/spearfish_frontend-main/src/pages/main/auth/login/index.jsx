import { Link } from 'react-router-dom';
import CustomButton from '../../../../components/Button';
import NavigationBar from '../../navigation';
import { useEffect, useState } from 'react';
import { validEmail, capitalize } from '../../../../global/utils/helperMethods';
import './login.scss';
import Notification from '../../../../components/notification';
import { QUERY_LOGIN_USER } from './graphql/queries';
import { useLazyQuery } from '@apollo/client';
import useAuth from '../../../../global/utils/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [loginUser] = useLazyQuery(QUERY_LOGIN_USER);
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const clearAllErrors = () => {
    setErrors(() => ({}));
  }

  const validateForm = () => {
    clearAllErrors();
    const generatedErrors = {}

    // Check valid email
    if (!validEmail(formData['email'])) {
      generatedErrors['email'] = `Email address is invalid`;
    }

    // Check for empties
    for (const [k, v] of Object.entries(formData)) {
      if (v.trim().length === 0 || v.trim() === '') {
        generatedErrors[k] = `${capitalize(k)} is required`;
      }
    }

    setErrors((prevErrors) => {
      return { ...prevErrors, ...generatedErrors };
    });

    return Object.keys(generatedErrors).length === 0;
  }

  const submitForm = () => {
    if (validateForm()) {
      setIsSubmitting(() => (true));
      loginUser({
        variables: {
          ...formData
        },
        onCompleted: async (data) => {
          const { user, token } = data.login;
          await login(user, token);
          navigate('/dashboard');
        },
        onError: (e) => {
          setRequestError(e.message);
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

  return (
    <>
      <NavigationBar includeMobileOnly={true} classes="nav-additional-styles" />
      <Notification severity={'error'} description={requestError} show={showErrors} setShow={setShowErrors} />
      <div className="signup-main login-main flex-row space-between align-center">
        <div className='form-content'>
          <div className='form-content-container flex-column-center align-center'>
            <div className='mt-20'>
              <div className='mb-30'>
                <h1 className='text-gradient'>Welcome</h1>
                <p className='fs-0-9 dull-black-2'>Don't have an account?
                  <Link to='/signup' className='c-secondary-2 ml-5 fw-bold'>Create account</Link></p>
              </div>

              <form method="post">
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
                <CustomButton onClick={submitForm} loading={isSubmitting}>
                  Login
                </CustomButton>
                <p className='m-tb-20 fs-0-9'>Forgot your password?
                  <Link to='/forgot_password' className='c-secondary-2 ml-5 fw-bold'>Recover your account.</Link>
                </p>
                <Link to='/signup' className='c-secondary-2 ml-5 fw-bold link-no-decoration'>
                  <CustomButton classes='outline-btn'>
                    Create an account
                  </CustomButton>
                </Link>
              </form>
            </div>
          </div>
        </div>
        <div className='image flex-column-center align-center'>
          <div className='about-details'>
            <p className='p-big'>Start saving with as little as KES 10 and grow
              your savings to a target, each day, week ,month or year.<br />
              <span className='fs-normal fw-600'>Fill the form to continue</span>
            </p>
            <p className='fw-600 c-text-primary'>
              Join a saving community today
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

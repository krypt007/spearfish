import './forgot_password.scss';
import NavigationBar from '../../navigation';
import Notification from '../../../../components/notification';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomButton from '../../../../components/Button';
import { capitalize, isEmpty } from '../../../../global/utils/helperMethods';
import { MUTATION_RESET_PASSWORD } from './graphql/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [formFields, setFormFields] = useState({
    password: '',
    confirmPassword: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [resetPassword] = useMutation(MUTATION_RESET_PASSWORD);
  const [severity, setSeverity] = useState('success');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState('');

  const inputValueChange = (e) => {
    const input = e.currentTarget;
    const { name, value } = input;
    setFormFields((prevState) => {
      return { ...prevState, [name]: value };
    })
  }

  const submitForm = () => {
    const errors = {};

    setFormErrors(() => ({}));

    if (formFields.password !== formFields.confirmPassword) {
      errors['password'] = `Password must match confirm password`;
      errors['confirmPassword'] = `Confirm password must match with password`;
    }

    for (const [k, v] of Object.entries(formFields)) {
      if (v.length < 7) {
        errors[k] = `${capitalize(k)} should have 7 or more characters`;
      }

      if (isEmpty(v)) {
        errors[k] = `${capitalize(k)} is required`;
      }
    }
    setFormErrors((prevState) => ({ ...prevState, ...errors }));
    if (Object.keys(errors).length > 0) {
      return;
    }

    const data = {
      email: searchParams.get('address'),
      recoveryToken: searchParams.get('pid'),
      password: formFields.password
    }

    setIsSubmitting(() => (true));
    resetPassword({
      variables: {
        data
      },
      onCompleted: () => {
        setRequestError(() => ('Password changed successfully. Redirecting ...'));
        setShowErrors(() => (true));
        setIsSubmitting(() => (false));
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      },
      onError: (e) => {
        setSeverity(() => ('error'));
        setRequestError(() => (e.message));
        setShowErrors(() => (true));
        setIsSubmitting(() => (false));
      }
    });
  }

  return (
    <>
      <NavigationBar classes='nav-bar-top' />
      <Notification severity={severity} description={requestError} show={showErrors} setShow={setShowErrors} />
      <div className="verify-main flex-column-center align-center">

        <form>
          <p className='title text-gradient'>Password reset</p>
          <p className='fs-0-8 m-tb-5 dull-black-2'>Having trouble accessing your account. Enter details to continue</p>
          <>
            <div className='input-container'>
              <label htmlFor="password" className='fs-0-7 verify-label'>Enter your new password</label>
              <input type="password" name="password" id="password" onChange={inputValueChange} />
              {formErrors.password && (
                <p className='error-txt show-error-txt'>{formErrors.password}</p>
              )}
            </div>
            <div className='input-container'>
              <label htmlFor="confirmPassword" className='fs-0-7 verify-label'>Repeat your new password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" onChange={inputValueChange} />
              {formErrors.confirmPassword && (
                <p className='error-txt show-error-txt'>{formErrors.confirmPassword}</p>
              )}
            </div>
            <CustomButton loading={isSubmitting} onClick={submitForm}>
              Reset
            </CustomButton>
          </>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;

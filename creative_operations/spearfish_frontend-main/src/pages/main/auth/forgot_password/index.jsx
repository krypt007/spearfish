import './forgot_password.scss';
import NavigationBar from '../../navigation';
import Notification from '../../../../components/notification';
import { useState } from 'react';
import CustomButton from '../../../../components/Button';
import { validEmail, isEmpty } from '../../../../global/utils/helperMethods';
import { MUTATION_REQUEST_PASSWORD_RESET } from './graphql/mutations';
import { useMutation } from '@apollo/client';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
  const [sendPasswordResetEmail] = useMutation(MUTATION_REQUEST_PASSWORD_RESET);
  const [emailSent, setEmailSent] = useState(false);

  const submitForm = () => {
    setFormError(() => (null));
    if (isEmpty(email)) {
      setFormError('Email field is required');
      return;
    }

    if (!validEmail(email)) {
      setFormError('Please provide a valid email');
      return;
    }

    setIsSubmitting(() => (true));

    sendPasswordResetEmail({
      variables: {
        email
      },
      onCompleted: () => {
        setEmailSent(() => (true));
        setIsSubmitting(() => (false));
      },
      onError: (e) => {
        setFormError(e.message);
        setShowErrors(() => (true));
        setIsSubmitting(() => (false));
      }
    })
  }

  return (
    <>
      <NavigationBar classes='nav-bar-top' />
      <Notification severity={'error'} description={formError} show={showErrors} setShow={setShowErrors} />
      <div className="verify-main flex-column-center align-center">

        <form>
          <p className='title text-gradient'>Password reset</p>
          <p className='fs-0-8 m-tb-5 dull-black-2'>Having trouble accessing your account. Enter details to continue</p>

          {emailSent && (
            <p className='text-gradient fw-600 m-tb-30'>Please check the email you provided for further instructions</p>
          )}

          {!emailSent && (
            <>
              <div className='input-container'>
                <label htmlFor="email" className='fs-0-7 verify-label'>Enter your email</label>
                <input type="email" name="email" id="email" onChange={
                  (e) => setEmail(() => (e.target.value))} />
                {formError !== null && (
                  <p className='error-txt show-error-txt'>{formError}</p>
                )}
              </div>
              <CustomButton loading={isSubmitting} onClick={submitForm}>
                Send instructions
              </CustomButton>
            </>
          )}
        </form>
      </div>
    </>
  )
}

export default ForgotPassword;

import './verify_email.scss';
import NavigationBar from '../../navigation';
import Notification from '../../../../components/notification';
import { MUTATION_VERIFY_EMAIL } from './graphql/mutations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import CustomButton from '../../../../components/Button';
import { isEmpty, isNumeric } from '../../../../global/utils/helperMethods';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [searchParams] = useSearchParams();
  const [verifyEmail] = useMutation(MUTATION_VERIFY_EMAIL);
  const [showErrors, setShowErrors] = useState(false);
  const navigate = useNavigate();

  const submitForVerification = () => {
    if (isEmpty(verificationCode)) {
      setFormError(() => ('Verification code is required'));
      setShowErrors(() => (true));
      return;
    }

    if (!isNumeric(verificationCode)) {
      setFormError(() => ('Verification code must be a number'));
      setShowErrors(() => (true));
      return;
    }

    setIsSubmitting(() => (true));

    const requestData = {
      email: searchParams.get('address'),
      code: parseInt(verificationCode),
      pid: searchParams.get('pid'),
    };

    verifyEmail({
      variables: {
        data: requestData
      },
      onCompleted: () => {
        navigate('/login');
      },
      onError: (e) => {
        setFormError(() => (e.message));
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
          <p className='title text-gradient'>Verify your email</p>
          <p className='fs-0-8 m-tb-5 dull-black-2'>A verification code was sent to your email. Use it below to continue</p>
          <div className='input-container'>
            <label htmlFor="verification-code" className='fs-0-7 verify-label'>Enter verification code</label>
            <input type="number" name="verification-code" id="verification-code" onChange={
              (e) => {
                setVerificationCode(() => (e.target.value));
              }
            } />
          </div>
          <CustomButton loading={isSubmitting} onClick={submitForVerification}>Verify</CustomButton>
        </form>
      </div>
    </>
  );
};

export default VerifyEmail;

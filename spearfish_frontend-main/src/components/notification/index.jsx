import { Icon } from '@iconify/react';
import './notification.scss';
import { useEffect, useRef } from 'react';
import { capitalize } from '../../global/utils/helperMethods';

const Notification = ({ severity, description, show, setShow, timeout, style, className }) => {
  const notification = useRef(null);

  const closeNotification = () => {
    const notf = notification.current;
    notf.classList.add('hide-notification');
    setShow(() => (false));
  }

  useEffect(() => {
    const notf = notification.current;
    if (show) {
      notf.classList.remove('hide-notification');
    }
    const timeOut = setTimeout(() => {
      notf.classList.add('hide-notification');
      setShow(() => (false));
    }, timeout || 10000);

    return () => {
      clearTimeout(timeOut);
    }
  }, [setShow, show, timeout]);

  return (
    <div className={`notification-main flex-row space-between bg-blur ${className} hide-notification`} ref={notification} style={style}>
      <div className='flex-row flex-start'>
        <div className={`icon flex-column-center align-center icon-${severity}`}>
          <Icon icon='charm:circle-tick' className='success' />
          <Icon icon='typcn:times' className='error' />
        </div>
        <div className='message'>
          <p className={`title c-${severity}`}>{capitalize(severity)}</p>
          <p className='fs-0-8'>{description}</p>
        </div>
      </div>
      <div className='closeIcon flex-column-center align-center' onClick={closeNotification}>
        <Icon icon='icon-park-twotone:close-one' className='fs-1-4' />
      </div>
    </div>
  );
};

export default Notification;

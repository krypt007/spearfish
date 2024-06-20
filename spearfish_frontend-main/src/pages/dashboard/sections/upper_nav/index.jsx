import './upper_nav.scss';
// import { Icon } from '@iconify/react';
// import useClickOutside from './useClickOutside';

const UpperNav = ({ title }) => {
  // const [navBar, isOutside] = useClickOutside();

  // const showInput = () => {
  //   const nav = navBar.current;
  //   const hasClass = nav.classList.contains('active');
  //   if (hasClass) {
  //     return;
  //   }
  //   nav.classList.add('active');
  // }

  // const focusLeave = () => {
  //   const nav = navBar.current;
  //   if (nav === null) return;
  //   nav.classList.remove('active');
  // }

  // if (isOutside) {
  //   focusLeave();
  // }

  return (
    <div className='upper-nav-main'>
      <div className="upper-nav-container bg-blur">
        <div className="flex-row space-between align-center">
          <div className='logo'>
            <p className="fs-1-2 fw-bold text-gradient">
              <span className='text-gradient'>Spear</span>fish
            </p>
          </div>
          {/* <div className='search flex-column-center align-center fs-1-2' onClick={showInput}>
            <Icon icon='lucide:search' className='icon' />
            <input type="text" placeholder='Search ...' />
          </div> */}
        </div>
      </div>
      <div style={{ paddingTop: '60px' }} className='bg-primary'>
        {/* <h3 className='text-gradient-2 ml-20 fs-1-3'>{title || 'Dashboard'}</h3> */}
      </div>
    </div>
  );
};

export default UpperNav;

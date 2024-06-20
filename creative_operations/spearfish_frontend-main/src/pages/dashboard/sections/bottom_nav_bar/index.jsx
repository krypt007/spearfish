import './bottom_nav.scss';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  const inActiveButtonStyles = `bottom-nav-link flex-column-center align-center link-no-decoration`;
  const activeButtonStyles = `${inActiveButtonStyles} active`;

  return (
    <div className='bottom-nav flex-row-space-evenly align-center hide'>
      <NavLink to="/dashboard"
        className={({ isActive }) => isActive ? activeButtonStyles : inActiveButtonStyles}>
        <div className='icon-holder flex-column-center align-center'>
          <Icon icon='clarity:home-line' />
        </div>
        <p>Home</p>
      </NavLink>
      <NavLink to="/budgets"
        className={({ isActive }) => isActive ? activeButtonStyles : inActiveButtonStyles}>
        <div className='icon-holder flex-column-center align-center'>
          <Icon icon='heroicons:banknotes' />
        </div>
        <p>Budgets</p>
      </NavLink>
      <NavLink to="/challenges"
        className={({ isActive }) => isActive ? activeButtonStyles : inActiveButtonStyles}>
        <div className='icon-holder flex-column-center align-center'>
          <Icon icon='mdi:progress-check' />
        </div>
        <p>Challenges</p>
      </NavLink>
      <NavLink to="/profile"
        className={({ isActive }) => isActive ? activeButtonStyles : inActiveButtonStyles}>
        <div className='icon-holder flex-column-center align-center'>
          <Icon icon='iconoir:profile-circled' />
        </div>
        <p>Profile</p>
      </NavLink>
    </div>
  )
};

export default BottomNav;

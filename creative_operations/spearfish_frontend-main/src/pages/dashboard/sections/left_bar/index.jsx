import './left_bar.scss';
import { NavLink, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import StickyContainer from '../../../../components/StickyContainer';

const LeftBar = () => {
  return (
    <aside className='left'>
      <StickyContainer top={20}>
        <div className="logo">
          <Link to='/' className='link-no-decoration'>
            <h1>
              <span className='text-gradient'>Spear</span>fish
            </h1>
          </Link>
        </div>
        <nav className='dashboard-nav'>
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) =>
                isActive ? 'active' : undefined
              }>
                <div className='flex-row flex-start align-center'>
                  <span className="icon flex-row-center align-center">
                    <Icon icon='clarity:home-line' />
                  </span> Home</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/budgets" className={({ isActive }) =>
                isActive ? 'active' : undefined
              }><div className='flex-row flex-start align-center'>
                  <span className="icon flex-row-center align-center">
                    <Icon icon='heroicons:banknotes' />
                  </span> Budgets</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/challenges" className={({ isActive }) =>
                isActive ? 'active' : undefined
              }><div className='flex-row flex-start align-center'>
                  <span className="icon flex-row-center align-center">
                    <Icon icon='mdi:progress-check' />
                  </span> Challenges</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={({ isActive }) =>
                isActive ? 'active' : undefined
              }><div className='flex-row flex-start align-center'>
                  <span className="icon flex-row-center align-center">
                    <Icon icon='iconoir:profile-circled' />
                  </span> My Profile</div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </StickyContainer>
    </aside>
  );
};

export default LeftBar;

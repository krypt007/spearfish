import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { scrollToHashElement } from '../../../global/utils/hashNav';
import './navigation.scss';

const NavigationBar = ({ includeMobileOnly, classes, styles }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenu = useRef(null);

  const toggleMobileMenu = () => {
    mobileMenu.current.classList.toggle('hamburger-links-hidden');
    setMobileMenuOpen(!mobileMenuOpen);
  }

  const scrollingToAbout = () => {
    scrollToHashElement(100, 'about');
    if (mobileMenu.current.classList.contains('hamburger-links-hidden')) return;
    toggleMobileMenu();
  }

  useEffect(() => {
    scrollToHashElement(100);
  }, []);

  return (
    <nav className={`main-page-nav width-90-m-auto bg-blur ${classes}`} style={styles}>
      <div className="landing-page-header flex-row space-between align-center">
        <div className="logo">
          <h3><span className='text-gradient'>Spear</span>fish</h3>
        </div>
        <div className='hamburger-menu flex-row-center align-center hide' onClick={toggleMobileMenu}>
          {!mobileMenuOpen && (<Icon icon='line-md:menu' className='icons' />)}
          {mobileMenuOpen && (<Icon icon='line-md:menu-to-close-transition' className='icons' />)}
        </div>
        <div className='hamburger-links flex-row flex-start align-center hamburger-links-hidden' ref={mobileMenu}>
          <ul>
            <li onClick={scrollingToAbout}><Link to='/#about' className='link-no-decoration'>About</Link></li>
            <li><Link to='/signup' className='link-no-decoration'> Signup</Link></li>
            <li><Link to='/login' className='link-no-decoration'>Login</Link></li>
          </ul>
        </div>
        {!includeMobileOnly && (
          <div className="links">
            <ul className='flex-row flex-end align-center'>
              <li onClick={scrollingToAbout}>
                <NavLink to="/#about" className={({ isActive }) =>
                  isActive ? 'active' : undefined
                }>
                  About
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/pricing" className={({ isActive }) =>
                  isActive ? 'active' : undefined
                }>
                  Pricing
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/signup" className={({ isActive }) =>
                  isActive ? 'active' : undefined
                }>
                  <button>Signup</button>
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;

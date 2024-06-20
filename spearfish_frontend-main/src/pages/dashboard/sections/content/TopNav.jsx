import { Icon } from "@iconify/react";
import './content.scss';
import useAuth from '../../../../global/utils/useAuth';
import { getCurrentDate } from "../../../../global/utils/helperMethods";


const MainNav = ({ pageTitle }) => {
  const { logout } = useAuth();
  const title = pageTitle || 'Dashboard';

  /**
   * @method initLogout
   * @description perform logging out the user
   * @returns {void}
   */
  const initLogout = async () => {
    await logout();
  }

  return (
    <div className="sticky bg-blur" style={{ top: 0 }}>
      <header className='header-container flex-row space-between align-center'>
        <div className="welcome">
          <h1 className="text-gradient-2">{title},</h1>
          <p className="fs-0-7">{getCurrentDate()}</p>
        </div>
        {/* <div className="search flex-row-center align-center">
          <Icon icon='clarity:search-line' className='icon' />
          <input type="text" placeholder="search" />
        </div> */}
        <div className="logout flex-row flex-start align-center" onClick={initLogout}>
          <div className="icon flex-column-center align-center">
            <Icon icon='ant-design:logout-outlined' />
          </div>
          <div>
            <p className="fs-0-8 dull-black-2 pr-10 text">Logout</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainNav;

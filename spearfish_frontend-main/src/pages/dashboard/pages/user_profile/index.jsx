import { Icon } from "@iconify/react";
// import { Link } from "react-router-dom";
import React from "react";
import useModal from '../../../../components/modal/useModal';
import SEO from "../../../../components/SEO";
import { dateToString } from "../../../../global/utils/helperMethods";
import useAuth from "../../../../global/utils/useAuth";
import Template from "../../Template";
import './user_profile.scss';

const EditProfile = React.lazy(() => (import('./EditProfile')));

const UserProfile = () => {
  const { user, logout, login } = useAuth();
  const { isOpen, closeModal, openModal } = useModal();

  /**
   * @method initLogout
   * @description perform logging out the user
   * @returns {void}
   */
  const initLogout = async () => {
    await logout();
  }

  return (
    <Template marginContent={'0 20px'} pageTitle='User profile'>
      <EditProfile isOpen={isOpen} closeModal={closeModal} data={user} loginUser={login} />
      <SEO title='Your moonfish profile page' description='Moonfish profile page' />
      <div className="user-profile-main-container flex-row space-between mt-20">
        <div className="profile-overview">
          <div>
            <p className="fw-600 m-tb-10">Profile details</p>
            <div className="overview-item flex-row space-between align-center">
              <div className="flex-row flex-start align-center text-gradient">
                <Icon icon='line-md:email-twotone-alt' className="mr-5" />
                <p className="fw-600">Email</p>
              </div>
              <div>
                <p className="fs-0-8">{user?.email.address}</p>
              </div>
            </div>
            <div className="overview-item flex-row space-between align-center">
              <div className="flex-row flex-start align-center text-gradient">
                <Icon icon='cil:phone' className="mr-5" />
                <p className="fw-600">Phone</p>
              </div>
              <div>
                <p className="fs-0-8">{user?.phone.number || 'Not added'}</p>
              </div>
            </div>
            <div className="overview-item flex-row space-between align-center">
              <div className="flex-row flex-start align-center text-gradient">
                <Icon icon='akar-icons:location' className="mr-5" />
                <p className="fw-600">Location</p>
              </div>
              <div>
                <p className="fs-0-8">{user?.location || 'Not added'}</p>
              </div>
            </div>
            <div className="overview-item flex-row space-between align-center">
              <div className="flex-row flex-start align-center text-gradient">
                <Icon icon='akar-icons:calendar' className="mr-5" />
                <p className="fw-600">Date Joined</p>
              </div>
              <div>
                <p className="fs-0-8">{dateToString(user?.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="personal-details flex-column-center align-center">
          <div>
            <div className="image">
              <img src="/images/welcome.jpg" alt="user-profile" />
            </div>
            <div className="details text-align-center">
              <h1>{user?.name}</h1>
              <p className="fs-0-7">{user?.email.address}</p>
            </div>
          </div>
          <div className="m-tb-20 details-btns">
            <button onClick={openModal}>Update profile</button>
            <button className="logout-btn mt-10" onClick={initLogout}>
              <Icon icon='uiw:logout' className="icon-elem mr-5" /> Logout
            </button>
          </div>
        </div>
      </div>
    </Template>
  );
}

export default UserProfile;

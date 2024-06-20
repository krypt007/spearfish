import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import './no_data.scss';

const NoData = ({ style, className, icon, text, navLink, navLinkText, action, actionText }) => {
  return (
    <div className={`no-data flex-column-center align-center ${className}`} style={{ style }}>
      <div className="info flex-column-center align-center">
        <Icon icon={icon || 'ic:twotone-info'} className='fs-1-5' />
      </div>
      <p className="fs-0-8 m-tb-20">{text}</p>
      {navLink && (
        <Link to={navLink} className='link-no-decoration'>
          <button className="button">{navLinkText}</button>
        </Link>
      )}
      {action && (
        <button className="button" onClick={action}>{actionText}</button>
      )}
    </div>
  );
};

export default NoData;

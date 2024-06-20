import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { capitalize, dateToString, formatNumber } from '../../../../global/utils/helperMethods';
import useAuth from '../../../../global/utils/useAuth';
import { QUERY_GET_RECENT_ACTIVITIES } from './graphql/queries';
import './right_bar.scss';

const LoadingActivities = React.lazy(() => (import('./loading/LoadingActivities')));
const StickyContainer = React.lazy(() => (import('../../../../components/StickyContainer')));

const CurrentUser = () => {
  const { user } = useAuth();

  return (
    <Link to='/profile' className='link-no-decoration'>
      <div className='user-container flex-row flex-start align-center gap-5'>
        <div className="thumbnail flex-column-center align-center">
          <img src="/images/user.png" alt="user" />
        </div>
        <div className="user-details">
          <p className='fw-bold fs-0-7'>{user?.name}</p>
          <p className='fs-0-7 dull-black'>{user?.email.address}</p>
        </div>
      </div>
    </Link>
  );
};

const RecentActivityItem = ({ activity }) => {
  return (
    <Link to={`/budgets/${activity.budget.id}/dials/${activity.category._id}`} className='link-no-decoration'>
      <div className="item flex-row space-between">
        <div className='flex-row flex-start'>
          <div className="icon flex-row-center align-center fs-1-2">
            <Icon icon={`${activity.category.icon}`} />
          </div>
          <div className="details">
            <p className='fw-bold fs-0-8'>{capitalize(activity.title)}</p>
            <p className='fs-0-7'>{capitalize(activity.description)}</p>
            <p className='fs-0-7 dull-black'>{dateToString(activity.date)}</p>
          </div>
        </div>
        <div className='amount fw-bold c-secondary-2'>{formatNumber(activity.amount)}</div>
      </div>
    </Link>
  );
};

const RecentActivities = () => {
  const { data, loading, error } = useQuery(QUERY_GET_RECENT_ACTIVITIES);
  const activities = data?.recentActivities;
  const totalActivities = activities?.length || 0;

  return (
    <div className="recent-activities m-tb-40">
      <div className="recent-activities-header flex-row space-between align-center">
        <h4>Recent activities</h4>
        {/* <Link to='#' className='fs-0-8 dull-black'>View all</Link> */}
      </div>

      {loading && (<LoadingActivities />)}
      {error && (<p>Error. {error.message}</p>)}
      {!loading && !error && totalActivities === 0
        && (<p className='fs-0-8 m-tb-10 dull-black-2'>No activities</p>)}
      {!loading && !error && totalActivities > 0 && (
        <div className="items">
          {activities.map((activity, index) => (
            <RecentActivityItem activity={activity} key={index} />
          ))}
        </div>
      )}

    </div>
  );
};

const RightBar = () => {
  return (
    <aside className='right'>
      <StickyContainer top={10}>
        <CurrentUser />
        <RecentActivities />
      </StickyContainer>
    </aside>
  );
};

export default RightBar;

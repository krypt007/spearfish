import { Icon } from '@iconify/react';
import SEO from '../../../../components/SEO';
import Template from '../../Template';
import './home.scss';
import { Link } from 'react-router-dom';
// import ActivityGraph from './ActivityGraph';
import useAuth from '../../../../global/utils/useAuth';
import { getFirstName, formatNumber } from '../../../../global/utils/helperMethods';
import { QUERY_MY_BUDGETS } from '../budgets/graphql/queries';
import { useQuery } from '@apollo/client';
import LoadingBudgetsSummary from './loading/LoadingBudgetsSummary';
import LoadingMyBudget from './loading/LoadingMyBudget';
import NoData from '../../../../components/no_data/NoData';
import { SAVINGS_PERCENTAGE } from '../../../../global/constants';

const Welcome = () => {
  const { user } = useAuth();
  return (
    <div className='welcome-container flex-row space-between align-center'>
      <div className="message">
        <h1>Welcome back, {getFirstName(user?.name)}</h1>
        <p className='fs-0-8'>
          Spearfish will help you save through cash management and challenges.
          Cash management is handled through budgets where you to enter
          an amount. {SAVINGS_PERCENTAGE * 100}% of the amount is added to
          savings category. Then you can distribute the rest to various
          categories. <b>Management does not involve real money.</b>
        </p>
      </div>
      <div className="image">
        <img src="/images/icon.png" alt="money-bag" />
      </div>
    </div>
  )
}

const MyBudget = () => {
  const { loading, data, error } = useQuery(QUERY_MY_BUDGETS, {
    variables: {
      data: {
        limit: 1,
      }
    }
  });

  const budgets = data?.getBudgets;
  const budget = budgets?.length > 0 ? budgets[0] : null;

  const spentAmount = () => {
    if (!budget) return 0;
    const amount = budget.categories.reduce((prev, current) => (prev + current.total_amount), 0);
    return amount;
  }

  const percentageSpent = () => {
    const used = spentAmount();
    const total = budget.amount;
    return Math.floor((used / total) * 100);
  }

  return (
    <>
      {loading && (<LoadingMyBudget />)}
      {error && (<p>Error. {error.message}</p>)}
      {!budget && (<NoData text='No active budgets' navLink='/budget/new'
        navLinkText='Create budget'
      />)}
      {!loading && !error && budget && (
        <div className='overview-item mb-20'>
          {budget && (
            <Link to={`/budgets/${budget.id}`} className='link-no-decoration'>
              <div className="upper flex-row space-between align-center">
                <div className='flex-row flex-start align-center'>
                  <div className="icon mr-20 flex-row-center align-center">
                    <img src="/images/shop.png" alt="rocket" />
                  </div>
                  <div className="details">
                    <div className='flex-row space-between align-center mb-10 gap-20'>
                      <div>
                        <p className='fw-600'>Budget</p>
                        <p className='fs-0-7 dull-white'>{budget?.name}</p>
                      </div>
                      <div className='detail-holder'>
                        <p className='fw-600'>{formatNumber(budget?.amount)}</p>
                        <p className='fs-0-7 dull-white'>Total amount</p>
                      </div>
                    </div>
                    {/* <p className='fs-0-8 dull-white'>The current active balance</p> */}
                  </div>
                </div>
                <div className="linking-icon flex-column-center align-center">
                  <Icon icon='eva:arrow-ios-forward-fill' />
                </div>
              </div>
              <div className="lower">
                <div className="progress-bar">
                  <div className="progress" style={{ minWidth: `${percentageSpent()}%` }}></div>
                </div>
                <div className='flex-row space-between align-center'>
                  <p className='fs-0-7'>Spent {formatNumber(spentAmount())}</p>
                  <p className='fs-0-8'><span className='fw-600'>{Math.floor(percentageSpent())}%</span></p>
                </div>
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

const BudgetsSummary = () => {
  const { loading, data, error } = useQuery(QUERY_MY_BUDGETS);

  const budgets = data?.getBudgets;

  const getActiveDials = () => {
    let count = 0;

    budgets.forEach((budget) => {
      const active = budget.categories.filter((category) => category.amount !== category.total_amount);
      count += active.length;
    });
    return count;
  }

  const spentAmount = (budget) => {
    if (!budget) return 0;
    const amount = budget.categories.reduce((prev, current) => (prev + current.total_amount), 0);
    return amount;
  }

  const getActiveBudgets = () => {
    let count = 0;
    budgets.forEach((budget) => {
      if (spentAmount(budget) < budget.amount) {
        count++;
      }
    });

    return count;
  }

  return (
    <>
      {loading && (<LoadingBudgetsSummary />)}
      {error && (<p>Error. {error.message}</p>)}
      {!loading && !error && (
        <Link to='/budgets' className='link-no-decoration'>
          <div className='overview-item oi-2 mb-20'>
            <div className="upper flex-row space-between align-center">
              <div className='flex-row flex-start align-center'>
                <div className="icon mr-20 flex-row-center align-center">
                  <img src="/images/report.png" alt="rocket" />
                </div>
                <div className="details">
                  <div className='flex-row space-between align-center mb-10 gap-20'>
                    <div>
                      <p className='fw-600'>{getActiveBudgets()}</p>
                      <p className='fs-0-7 dull-white'>Active {getActiveBudgets() > 1 ? 'Budgets' : 'Budget'}</p>
                    </div>
                    <div className='detail-holder'>
                      <p className='fw-600'>{formatNumber(getActiveDials())}</p>
                      <p className='fs-0-7 dull-white'>Active dials</p>
                    </div>
                  </div>
                  {/* <p className='fs-0-8 dull-white'>The current active balance</p> */}
                </div>
              </div>
              <div className="linking-icon flex-column-center align-center">
                <Icon icon='eva:arrow-ios-forward-fill' />
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

const HomePage = () => {

  return (
    <Template pageTitle='Dashboard' marginContent='0 0 80px 0'>
      <SEO title='Welcome to moonfish' description='Moonfish saving app' />
      <div className='p-20'>
        <Welcome />
        <div className='services-overview flex-row space-between m-tb-40'>
          <div className="milestones">
            <div className='image'>
              <img src="/images/milestone.png" alt="milestone" />
            </div>
            <div className='content'>
              <p className='fs-1-2 fw-600'>Challenges</p>
              <p className='fs-0-8 m-tb-10'>
                Earn points and rewards by completing tasks and challenges
              </p>
              <Link to='/challenges'>
                <button>More details</button>
              </Link>
            </div>
          </div>
          <div className="overviews-container flex-column">
            <BudgetsSummary />
            <MyBudget />
          </div>
        </div>
        {/* <ActivityGraph /> */}
      </div>
    </Template>
  );
};

export default HomePage;

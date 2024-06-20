import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import useModal from '../../../../components/modal/useModal';
import CustomPopper from '../../../../components/popper';
import SEO from '../../../../components/SEO';
import { NOT_EXPENSES_CATEGORIES, SAVINGS_PERCENTAGE } from '../../../../global/constants';
import { capitalize, clamp, formatNumber } from '../../../../global/utils/helperMethods';
import './category.scss';
import CategoryActions from './category_actions';
import { QUERY_GET_CATEGORY } from './graphql/queries';

const Template = React.lazy(() => (import('../../Template')));
const LoadingDialOverview = React.lazy(() => (import('./loading/LoadingDialOverviews')));
const NewTransaction = React.lazy(() => (import('./new_transaction/NewTransaction')));
const Reports = React.lazy(() => (import('./Transactions')));

const Overview = ({ budget, _category }) => {
  const percentSpent = (_category.total_amount / _category.amount) * 100;
  const balance = _category.amount - _category.total_amount;
  const total = _category.amount + _category.total_amount;
  const categoryName = _category.category.name.toLowerCase();
  const isExpense = !NOT_EXPENSES_CATEGORIES.includes(categoryName)

  return (
    <div className='category-overview flex-row space-between align-center'>
      <div className="cards flex-row space-between">
        <div className="card flex-row space-between align-center">
          <div className="icon flex-column-center align-center">
            <Icon icon='grommet-icons:money' />
          </div>
          <div className='details text-align-right'>
            {categoryName === 'saving' && (<p className='fs-0-9'>{SAVINGS_PERCENTAGE * 100}% of total</p>)}
            {categoryName === 'investment' && (<p className='fs-0-9'>Initially invested</p>)}
            {isExpense && (<p className='fs-0-9'>Target</p>)}
            <p className='big-p'>{formatNumber(_category.amount)}</p>
          </div>
        </div>
        <div className={`card gradient-2 ${!isExpense && 'flex-row space-between align-center'}`}>
          {!isExpense ? (
            <>
              <div className="icon flex-column-center align-center">
                <Icon icon='majesticons:money-hand-line' />
              </div>
              <div className='details text-align-right'>
                {categoryName === 'saving' && (<p className='fs-0-9'>New savings</p>)}
                {categoryName === 'investment' && (<p className='fs-0-9'>New investments</p>)}
                <p className='big-p'>{formatNumber(_category.total_amount)}</p>
              </div>
            </>
          ) : (
            <div className='flex-row space-between align-center'>
              <div className="icon flex-column-center align-center">
                <Icon icon='majesticons:money-hand-line' />
              </div>
              <div className='details text-align-right'>
                <p className='fs-0-9'>Expenditure</p>
                <p className='big-p'>{formatNumber(_category.total_amount)}</p>
              </div>
            </div>
          )}
          {isExpense && (
            <div className='text-align-right c-text-secondary'>
              <div className='progress-bar'>
                <div className='progress' style={{ width: `${clamp(percentSpent, 0, 100)}%` }}></div>
              </div>
              <p className='fs-0-7'>{Math.floor(percentSpent)}%</p>
            </div>
          )}
        </div>
        <div className="card flex-row space-between align-center gradient-3">
          <div className="icon flex-column-center align-center">
            <Icon icon='ph:money' />
          </div>
          <div className='details text-align-right'>
            {categoryName === 'saving' && (
              <>
                <p className='fs-0-9'>Total saved</p>
                <p className='big-p'>{formatNumber(total)}</p>
              </>
            )}
            {categoryName === 'investment' && (
              <>
                <p className='fs-0-9'>Total invested</p>
                <p className='big-p'>{formatNumber(total)}</p>
              </>
            )}
            {isExpense && (
              <>
                <p className='fs-0-9'>Remaining</p>
                <p className='big-p'>{formatNumber(balance)}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Category = () => {
  const { budget_id, dial_id } = useParams();
  const { loading, error, data } = useQuery(QUERY_GET_CATEGORY, {
    variables: {
      budgetId: budget_id, categoryId: dial_id
    }
  });
  const defaultValue = { _category: {}, budget: {} };
  const { isOpen, closeModal, openModal } = useModal();
  const { _category, budget } = data?.getCategory || defaultValue;

  return (
    <Template marginContent={`0 20px 120px 20px`} pageTitle={`${loading ? '...' : `${capitalize(_category.category.name)} dial`}`}>
      <SEO title={`${loading ? '...' : `${capitalize(_category.category.name)} dial`}`} description='Manage your budget dials' />
      {loading && (<LoadingDialOverview />)}
      {error && (<p>Error. {error.message}</p>)}
      {!loading && !error && (
        (<Overview budget={budget} _category={_category} />)
      )}
      <div className='sub-dials-container'>
        <div className="flex-row space-between align-center mb-20">
          <div>
            <p className="fw-600 fs-1-2">Sub Dials</p>
            {/* <p className="fs-0-7">Transactions made for this dial</p> */}
          </div>
          <div className="flex-row dial-action-btns flex-start align-center c-secondary-1 fw-bold gap-10">
            {!loading && !error && (
              <CategoryActions category={_category} />
            )}
            <CustomPopper text='Add sub-dial'>
              <button className="action-btns" onClick={openModal}>
                <Icon icon="material-symbols:add" className="fs-1-3" />
              </button>
            </CustomPopper>
          </div>
        </div>
      </div>
      <NewTransaction isOpen={isOpen} closeModal={closeModal} />
      <Reports />
    </Template>
  );
}

export default Category;

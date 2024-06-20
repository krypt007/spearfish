import { Link, useParams } from 'react-router-dom';
import { capitalize, formatNumber } from '../../../../../../global/utils/helperMethods';
import './categories.scss';
import LoadingCategories from './loading/LoadingCategories';
import React from 'react';

const NoData = React.lazy(() => (import('../../../../../../components/no_data/NoData')));

const CategoryDetails = ({ categoryData, budgetId }) => {
  const { category, amount } = categoryData;

  return (
    <Link to={`/budgets/${budgetId}/dials/${category._id}`} className='link-no-decoration'>
      <div className='category-card' style={{ background: `url(${category.img.toLowerCase()}) no-repeat center` }}>
        <div className='m-tb-10 content'>
          <p className='fw-600'>{capitalize(category.name)}</p>
          <div style={{ minHeight: '50px' }}>
            <p className='fs-0-8 m-tb-5'>{category.description}</p>
          </div>
          <div className='flex-row space-between align-center'>
            <p className='fs-0-7 c-secondary-2 fw-600'>Total amount: <br />
              <span className='fw-bold fs-0-8'> {formatNumber(amount)}</span></p>
            <button>Details</button>
          </div>
        </div>
      </div>
    </Link>
  )
}

const Categories = ({ loading, error, data }) => {
  const { id } = useParams();

  if (loading) return (<LoadingCategories />);
  if (error) return (<p>Error. {error.message} ...</p>);
  const categories = data.getCategoriesInBudget;
  const totalCategories = categories?.length || 0;

  return (
    <>
      {totalCategories === 0 ? (
        <NoData text='No categories available.'
        />
      ) : (
        <div className="categories-container flex-row flex-start">
          {categories.map((category, index) => (
            <CategoryDetails categoryData={category} budgetId={id} key={index} />
          ))}
        </div>
      )}
      {/* <div className='flex-row flex-start'>
        <Link className='fs-0-8 c-secondary-2 fw-bold view-all-btn' to={`/budgets/${id}/dials`}>
          View all
        </Link>
      </div> */}
    </>
  );
};

export default Categories;

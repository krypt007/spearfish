import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SEO from '../../../../components/SEO';
import Table from '../../../../components/Tables';
import Template from '../../Template';
import './categories.scss';
import { useQuery } from '@apollo/client';
import { QUERY_GET_CATEGORIES_IN_BUDGET } from './graphql/queries';
import { capitalize, formatNumber } from '../../../../global/utils/helperMethods';


const MobileRows = ({ categoriesLimit, categories, navigateToPage }) => {

  return (
    <>
      {categories.slice(0, categoriesLimit).map((data, index) => (
        <tr key={index} onClick={() => navigateToPage(data.category._id)}>
          <td className='flex-row flex-start align-center'>
            <span className='icon flex-row-center align-center'>
              <Icon icon={data.category.icon} />
            </span>{capitalize(data.category.name)}
          </td>
          <td>{formatNumber(data.amount)}</td>
          <td>{formatNumber(data.total_amount)}</td>
          <td className="fs-1-2 c-secondary-2"><Icon icon='line-md:chevron-small-right' /></td>
        </tr>
      ))}
    </>
  );
}

const TableRows = ({ categories, categoriesLimit, navigateToPage }) => {

  return (
    <>
      {categories.slice(0, categoriesLimit).map((data, index) => (
        <tr key={index} onClick={() => navigateToPage(data.category._id)}>
          <td><input type="checkbox" name="" id="" /></td>
          <td className='flex-row flex-start align-center fw-500'>
            <span className='icon flex-row-center align-center'>
              <Icon icon={data.category.icon} />
            </span>{capitalize(data.category.name)}
          </td>
          <td className='fs-0-8'>{capitalize(data.category.description)}</td>
          <td>{formatNumber(data.amount)}</td>
          <td>{formatNumber(data.total_amount)}</td>
        </tr>
      ))}
    </>
  )
}

const Category = () => {
  const { budget_id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(QUERY_GET_CATEGORIES_IN_BUDGET, {
    variables: {
      budgetId: budget_id
    }
  });
  const viewLessLimit = 6;
  const [categoriesLimit, setCategoriesLimit] = useState(viewLessLimit);

  const setNewLimit = () => {
    const limit = data.getCategoriesInBudget.length;
    if (categoriesLimit <= viewLessLimit) {
      setCategoriesLimit(limit);
    } else {
      setCategoriesLimit(viewLessLimit);
    }
  }

  const navigateToPage = (category_id) => {
    navigate(`/budgets/${budget_id}/categories/${category_id}`);
  }

  const categories = data?.getCategoriesInBudget;
  const totalCategories = categories?.length || 0;

  return (
    <Template marginContent={`0 20px 100px 20px`} pageTitle='Budget dials'>
      <SEO
        title='Moonfish dials'
        description='View all dials available in moonfish app saving app'
      />
      <div className="categories-header flex-row space-between align-center">
        <div className='flex-row flex-start align-center'>
          <div>
            <h1>All Dials</h1>
            <p className='fs-0-7'>Dials in your selected budget</p>
          </div>
        </div>
        <div className='flex-row flex-end align-center'>
          <div className='search flex-row-center align-center mr-20'>
            <div className='icon flex-column-center align-center'>
              <Icon icon="line-md:search" flip="horizontal" />
            </div>
            <input
              type="text"
              placeholder="Quick search category"
            />
          </div>
          <div className='add-category-button flex-row-center align-center'>
            <Icon icon='fluent:add-24-filled' className='mr-5' />
            <p>Add dial</p>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div className='categories-table'>
          {error && (<p>Error. {error.message} ...</p>)}
          <Table Rows={TableRows}
            categories={categories} categoriesLimit={categoriesLimit} navigateToPage={navigateToPage}
            headerTitles={['#', 'Name', 'Description', 'Budget amount', 'Amount spent']}
          />
          <Table Rows={MobileRows} classes='mobile-table'
            headerTitles={['Name', 'Amount', 'Bal', '']} navigateToPage={navigateToPage}
            categories={categories} categoriesLimit={categoriesLimit}
          />
          {totalCategories > viewLessLimit &&
            (
              <div className='flex-row flex-end m-tb-10'>
                <div className='view-all-btn'>
                  <p onClick={setNewLimit}>
                    {categoriesLimit <= viewLessLimit ? 'View more' : 'View less'}
                  </p>
                </div>
              </div>
            )
          }
        </div>
      )}
    </Template>
  );
};

export default Category;

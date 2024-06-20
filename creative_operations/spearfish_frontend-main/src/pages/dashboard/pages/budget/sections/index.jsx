import React from 'react';
import BudgetActions from '../budget_actions/BudgetActions';
import './budgets.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GET_CATEGORIES_IN_BUDGET } from '../../categories/graphql/queries';


const Categories = React.lazy(() => import('./categories'));

const CategoriesCards = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_GET_CATEGORIES_IN_BUDGET, {
    variables: {
      budgetId: id
    }
  });

  return (
    <section className='categories-cards'>
      <div className='categories-cards-main'>
        <div className='categories-header flex-row space-between align-center mb-20'>
          {/* <HorizontalNav links={horizontalLinks} activeLink={activeLink} setActiveLink={setActiveLink} /> */}
          <div>
            <p className='fw-bold'>Your dials</p>
            <p className='fs-0-7 dull-black-2'>Dials are categories you are managing</p>
          </div>
          <BudgetActions data={data} />
        </div>
        <Categories loading={loading} error={error} data={data} />
      </div>
    </section>
  )
}

export default CategoriesCards;

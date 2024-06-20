import { Icon } from '@iconify/react';
import SEO from '../../../../components/SEO';
import Template from '../../Template';
import './budget.scss';
import Sections from './sections';
import { QUERY_GET_BUDGET } from './graphql/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { capitalize, formatNumber } from '../../../../global/utils/helperMethods';
import LoadingSummary from './loading/LoadingSummary';
import { SAVINGS_PERCENTAGE, NOT_EXPENSES_CATEGORIES } from '../../../../global/constants';

const OverviewItem = ({ icon, amount, title, additional }) => {
  return (
    <div className='item flex-row'>
      <div className='icon'><Icon icon={icon} /></div>
      <div className='item-content'>
        <p className='fs-0-8 p-small'>{title}</p>
        <p className='p-large'>{amount !== null ? formatNumber(amount) : 0}</p>
        <p className='fs-0-7'>
          <span className='flex-row flex-start'>
            <Icon icon='akar-icons:info' className='mr-5 fs-0-9' /> {additional}
          </span>
        </p>
      </div>
    </div>
  );
};

const Summary = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_GET_BUDGET, {
    variables: {
      query: {
        _id: id
      }
    }
  });

  if (loading) return (<LoadingSummary />);
  if (error) return (<p>Error. {error.message}</p>);
  const budget = data.getBudget;

  const findMaxMinSpentCategory = (categories) => {
    let min = 0;
    let max = 0;
    let minSpentCategory = null;
    let maxSpentCategory = null;

    categories.forEach((item) => {
      if (NOT_EXPENSES_CATEGORIES.includes(item.category.name.toLowerCase())) return;
      if (min === 0 && item.total_amount > min) {
        min = item.total_amount;
        minSpentCategory = item;
      }

      if (item.total_amount > max) {
        max = item.total_amount;
        maxSpentCategory = item;
      }
      if (item.total_amount < min) {
        min = item.total_amount;
        minSpentCategory = item;
      }
    });

    return { minSpentCategory, maxSpentCategory };
  }

  const findSavings = () => {
    if (!budget?.categories) return 0;
    const savingCatg = budget.categories.find((item) => item.category.name.toLowerCase() === 'saving');
    if (!savingCatg) return 0;
    return savingCatg.amount + savingCatg.total_amount;
  }

  const { minSpentCategory, maxSpentCategory } = findMaxMinSpentCategory(budget.categories);
  const minSpentAmount = minSpentCategory ? minSpentCategory.total_amount : 0;
  const maxSpentAmount = maxSpentCategory ? maxSpentCategory.total_amount : 0;


  return (
    <section className="budgets-summary flex-row space-between">
      <div className='overview-items flex-row space-around'>
        <OverviewItem title='Total' amount={budget.amount}
          additional={'managed amount'}
          icon='ep:money' />
        <OverviewItem title='Savings' amount={findSavings()} additional={(<span>savings + <br />{SAVINGS_PERCENTAGE * 100}% of total</span>)}
          icon='fluent:savings-16-regular' style={{ fontSize: '2.5rem' }} />
      </div>
      <div className='overview-items flex-row space-around align-center'>
        <OverviewItem title='Lowest spent' amount={minSpentAmount}
          icon='bx:line-chart-down' additional={
            `${minSpentAmount === 0 ? 'not spent' : capitalize(minSpentCategory.category.name)}`
          } />
        <OverviewItem title='Highest spent' amount={maxSpentAmount}
          icon='ci:line-chart-up'
          additional={`${maxSpentAmount === 0 ? 'not spent' : capitalize(maxSpentCategory.category.name)}`} />
      </div>
    </section>
  )
}

const Budget = () => {
  return (
    <Template marginContent={'0 20px 120px 20px'} pageTitle='Budgets'>
      <SEO title='Moonfish budgets to help you save' description='Get to manage saving through budgets with expenses.' />
      <>
        <Summary />
        <Sections />
      </>
    </Template>
  );
};

export default Budget;

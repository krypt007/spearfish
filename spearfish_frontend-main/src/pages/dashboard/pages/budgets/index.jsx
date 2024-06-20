import { useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from '../../../../components/confirm_modal';
import useModal from '../../../../components/modal/useModal';
import Notification from '../../../../components/notification';
import SEO from '../../../../components/SEO';
import { generateGradient } from '../../../../global/utils/gradient';
import { dateToString } from '../../../../global/utils/helperMethods';
import Template from '../../Template';
import BudgetActions from './BudgetActions';
import './budgets.scss';
import EditBudget from './EditBudget';
import { MUTATION_DELETE_BUDGET } from './graphql/mutation';
import { QUERY_MY_BUDGETS } from './graphql/queries';
import LoadingBudgetCard from './loading/LoadingBudgetCard';
import NoBudget from './No_Budget';

const BudgetCard = ({ budget, openDeleteModal, openEditModal }) => {

  return (
    <div className="budget-card flex-row space-between align-center mb-10">
      <Link to={`/budgets/${budget.id}`} className='link-no-decoration' style={{ width: '100%' }}>
        <div className='flex-row space-between align-center info'>
          <div className='flex-row flex-start align-center'>
            <div className="icon" style={{ background: generateGradient() }}>
              <div className="overlay bg-blur"></div>
              <Icon icon='bx:category-alt' />
            </div>
            <div className="details">
              <p className='fs-0-9 fw-600'>{budget.name}</p>
              <p className='fs-0-7 dull-black-2 not-in-mobile'>{dateToString(budget.createdAt)}</p>
            </div>
          </div>
          <div className='flex-row-center align-center'>
            <div className='mr-20'>
              <p className='fw-600 fs-0-9'>{budget.amount}</p>
              <p className='fs-0-7 dull-black'>Total</p>
            </div>
            <div className='mr-20 not-in-mobile'>
              <p className='fw-600 fs-0-9'>{budget.categories.length}</p>
              <p className='fs-0-7 dull-black'>Dials</p>
            </div>
          </div>
        </div>
      </Link>
      <BudgetActions handleDelete={openDeleteModal} handleEdit={openEditModal} data={budget}>
        <div className="actions">
          {/* <div className="icon edit"><Icon icon='fluent-mdl2:page-edit' /></div> */}
          <div className="icon delete">
            <Icon icon='mi:options-vertical' className='fs-1-5' />
          </div>
        </div>
      </BudgetActions>
    </div>
  );
};

const BudgetsContainer = ({ budgets }) => {
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [requestError, setRequestError] = useState('');
  const { isOpen, openModal, closeModal, resource, setResource } = useModal();
  const [deleteBudget] = useMutation(MUTATION_DELETE_BUDGET);

  const closeConfirmDeleteModal = () => {
    setIsOpenConfirmDelete(false);
  }

  const openDeleteModal = (budget) => {
    setResource(budget);
    setIsOpenConfirmDelete(true);
  }

  const openEditModal = (budget) => {
    setResource(budget);
    openModal();
  }

  const handleDeleteBudget = () => {
    setIsDeleting(true);
    deleteBudget({
      variables: {
        deleteBudgetId: resource.id
      },
      onCompleted: () => {
        setRequestError('');
        setIsDeleting(false);
        setShowNotification(true);
        closeConfirmDeleteModal();
      },
      onError: (err) => {
        setRequestError(err.message);
        setShowNotification(true);
      },
      refetchQueries: [
        { query: QUERY_MY_BUDGETS }
      ],
    });
  };

  return (
    <>
      <Notification severity={requestError ? 'error' : 'success'}
        show={showNotification} setShow={setShowNotification}
        description={requestError || 'Deleted successfully'} />
      <ConfirmModal isProcessing={isDeleting} performOperation={handleDeleteBudget}
        isOpen={isOpenConfirmDelete} closeModal={closeConfirmDeleteModal} >
        Are you sure you want to delete this budget?
      </ConfirmModal>
      <EditBudget isOpen={isOpen} closeModal={closeModal} data={resource} />
      {budgets.map((budget, index) => (
        <BudgetCard key={index} budget={budget}
          openDeleteModal={openDeleteModal} openEditModal={openEditModal} />
      ))}
    </>
  );
};

const BudgetsWrapper = () => {
  const { loading, error, data } = useQuery(QUERY_MY_BUDGETS);

  const budgets = data?.getBudgets || [];
  const totalBudgets = budgets.length;

  if (loading) return (<LoadingBudgetCard />);
  if (error) return (<div>Error. {error.message}</div>);

  return (
    <div className='mt-30'>
      {error && (<div>Error: {error.message} ...</div>)}
      {totalBudgets === 0 && (<NoBudget />)}
      {totalBudgets > 0 && (
        <BudgetsContainer budgets={budgets} />
      )}
    </div>
  )
}

const Budgets = () => {
  return (
    <Template marginContent={'0 20px 120px 20px'} pageTitle='Budgets'>
      <SEO title='Moonfish budgets to help you save' description='Get to manage saving through budgets with expenses.' />
      <div className="budgets-title m-tb-20 flex-row space-between align-center">
        <div className='flex-row flex-start align-center'>
          <div className="icon-big">
            <Icon icon='openmoji:shopping-bags' className='mr-10' style={{ fontSize: '2.3rem' }} />
          </div>
          <div>
            <p className='fw-bold'>All budgets</p>
            <p className='fs-0-7 dull-black-2'>Budgets previously created</p>
          </div>
        </div>
        <div>
          <Link to='/budget/new' className='link-no-decoration'>
            <button>
              Create
              <Icon icon='fluent:channel-add-28-regular' className='ml-10 fs-1-2' />
            </button>
          </Link>
        </div>
      </div>
      <BudgetsWrapper />
    </Template>
  );
};

export default Budgets;

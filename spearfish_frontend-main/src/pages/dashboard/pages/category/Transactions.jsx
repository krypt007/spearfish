import { useMutation, useQuery } from "@apollo/client";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useModal from "../../../../components/modal/useModal";
import { dateToString, formatNumber } from "../../../../global/utils/helperMethods";
import { QUERY_GET_RECENT_ACTIVITIES } from "../../sections/right_bar/graphql/queries";
import { QUERY_GET_BUDGET } from "../budget/graphql/queries";
import { QUERY_GET_CATEGORIES_IN_BUDGET } from "../categories/graphql/queries";
import { MUTATION_DELETE_CATEGORY_TRANSACTION } from "./graphql/mutations";
import { QUERY_GET_CATEGORY, QUERY_GET_CATEGORY_TRANSACTIONS } from "./graphql/queries";
import './reports.scss';

const ConfirmModal = React.lazy(() => (import("../../../../components/confirm_modal")));
const Notification = React.lazy(() => (import("../../../../components/notification")));
const LoadingRows = React.lazy(() => (import("./Rows/loading")));
const EntryRow = React.lazy(() => (import("./Rows/EntryRow")));
const EditTransaction = React.lazy(() => (import('./edit_transaction')));

const RowData = ({ data }) => {

  return (
    <>
      <div className='flex-row flex-start align-center large-width'>
        <div className="icon icon-bg">
          <Icon icon='carbon:result-new' />
        </div>
        <div>
          <p className='fw-bold'>{data.title}</p>
          <p className='fs-0-8 hide-on-open'>{data.description}</p>
        </div>
      </div>
      <div className="hide-on-mobile">
        <p>{dateToString(data.date)}</p>
      </div>
      <div>
        <p className="fw-bold text-gradient">{formatNumber(data.amount)}</p>
      </div>
    </>
  );
};

const AdditionalData = ({ openEditModal, openDeleteModal, data }) => {
  const handleOpeningEditModal = () => {
    openEditModal(data);
  }

  const handleOpeningDeleteModal = () => {
    openDeleteModal(data);
  }

  return (
    <>
      <div>
        <p className='fs-0-8'>{data.description}</p>
        <p className='fs-0-7'>{dateToString(data.date, true)}</p>
      </div>
      <div className='buttons flex-row flex-start gap-10'>
        <div className="icon flex-column-center align-center" onClick={handleOpeningEditModal}>
          <Icon icon='ic:round-edit-note' className='fs-1-3' />
        </div>
        <div className="icon flex-column-center align-center" onClick={handleOpeningDeleteModal}>
          <Icon icon='fluent:delete-32-regular' className='fs-1-3' />
        </div>
      </div>
    </>
  );
};

const Transactions = () => {
  const { isOpen, openModal, closeModal, resource, setResource } = useModal();
  const { budget_id, dial_id } = useParams();
  const { loading, error, data } = useQuery(QUERY_GET_CATEGORY_TRANSACTIONS, {
    variables: {
      data: {
        budget_id,
        category_id: dial_id
      }
    }
  });
  const [deleteCategoryTransaction] = useMutation(MUTATION_DELETE_CATEGORY_TRANSACTION);
  const [requestError, setRequestError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showNotf, setShowNotf] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setResource(null);
  }

  const openEditModal = (selectedResource) => {
    setIsEditModalOpen(true);
    setResource(selectedResource);
  }

  const openDeleteModal = (selectedResource) => {
    openModal();
    setResource(selectedResource);
  }

  const deleteTransaction = () => {
    if (!resource) return;
    setIsProcessing(true);
    deleteCategoryTransaction({
      variables: {
        transactionId: resource.id
      },
      onCompleted: () => {
        setRequestError('');
        setShowNotf(true);
        setIsProcessing(false);
        closeModal();
      },
      onError: (e) => {
        setRequestError(e.message);
        setShowNotf(true);
        setIsProcessing(false);
        closeModal();
      },
      refetchQueries: [
        {
          query: QUERY_GET_CATEGORY_TRANSACTIONS,
          variables: {
            data: {
              budget_id,
              category_id: dial_id
            }
          }
        },
        {
          query: QUERY_GET_CATEGORY,
          variables: {
            budgetId: budget_id, categoryId: dial_id
          }
        },
        {
          query: QUERY_GET_CATEGORIES_IN_BUDGET,
          variables: {
            budgetId: budget_id
          }
        },
        {
          query: QUERY_GET_BUDGET,
          variables: {
            query: {
              _id: budget_id
            }
          }
        },
        {
          query: QUERY_GET_RECENT_ACTIVITIES
        }
      ]
    })
  }

  const totalTransactions = data?.getCategoryTransactions?.length || 0;
  const transactions = data?.getCategoryTransactions;

  return (
    <div>
      <Notification severity={requestError ? 'error' : 'success'}
        show={showNotf} setShow={setShowNotf} description={requestError || 'Operation successfull'} />
      {loading && (<LoadingRows />)}
      {error && (<p>Error. {error.message}</p>)}
      {!loading && !error && (
        <>
          {totalTransactions === 0 && (
            <div className="flex-column-center align-center" style={{ height: '300px' }}>
              <img src="/images/no-data.png" alt="no-data" className="mt-50" />
              <p className="fs-0-8 m-tb-10 text-align-center">No sub dials found. <br /> Add new to see details here</p>
            </div>
          )}
          {totalTransactions > 0 && (
            <>
              <EditTransaction isOpen={isEditModalOpen} closeModal={closeEditModal} data={resource} />
              <ConfirmModal isOpen={isOpen} closeModal={closeModal} performOperation={deleteTransaction}
                isProcessing={isProcessing}>
                {resource && (
                  <p>You are about to delete <b>{resource.description}</b> sub-dial{`(Transaction)`}. Please confirm this operation.</p>
                )}
              </ConfirmModal>
              <div className='rows'>
                {transactions.map((transaction, index) => (
                  <EntryRow key={index} rowData={<RowData data={transaction} />}
                    rowDataAdditionalData={
                      <AdditionalData openEditModal={openEditModal}
                        openDeleteModal={openDeleteModal} data={transaction} />
                    }
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Transactions;

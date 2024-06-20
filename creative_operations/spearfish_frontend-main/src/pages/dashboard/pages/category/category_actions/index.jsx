import CustomPopper from "../../../../../components/popper";
import { Icon } from "@iconify/react";
import ConfirmModal from "../../../../../components/confirm_modal";
import useModal from "../../../../../components/modal/useModal";
import { useState } from "react";
import EditCategory from "./EditCategory";
import { MUTATION_DELETE_CATEGORY } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { QUERY_GET_BUDGET } from "../../budget/graphql/queries";
import { QUERY_GET_CATEGORIES_IN_BUDGET } from "../../categories/graphql/queries";
import { QUERY_GET_CATEGORY } from "../graphql/queries";

const CategoryActions = ({ category }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isOpen, closeModal, openModal } = useModal();
  const [deleteCategory] = useMutation(MUTATION_DELETE_CATEGORY);
  const { budget_id, dial_id } = useParams();
  const navigate = useNavigate();

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  }

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  }

  const openEditModal = () => {
    openModal();
  }

  const handleDeletingCategory = () => {
    setIsDeleting(true);
    deleteCategory({
      variables: {
        budgetId: budget_id,
        categoryId: dial_id
      },
      onCompleted: () => {
        closeConfirmModal();
        setIsDeleting(false);
        navigate(`/budgets/${budget_id}`);
      },
      onError: (e) => {
        setIsDeleting(false);
        console.log(e.message);
      },
      refetchQueries: [
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
        }
      ]
    });
  }

  return (
    <>
      <ConfirmModal isOpen={isConfirmModalOpen} isProcessing={isDeleting}
        closeModal={closeConfirmModal} performOperation={handleDeletingCategory}>
        <p className="c-text-secondary fw-500">
          You are about to delete <span style={{ fontWeight: 'bold' }}>{category['category'].name}</span> dial. Please confirm.
        </p>
      </ConfirmModal>
      <EditCategory isOpen={isOpen} closeModal={closeModal} data={category} />
      <CustomPopper text='Edit'>
        <button className="action-btns" onClick={openEditModal}>
          <Icon icon="mdi:file-edit-outline" className="fs-1-3" />
        </button>
      </CustomPopper>
      <CustomPopper text='Delete'>
        <button className="action-btns" onClick={openConfirmModal}>
          <Icon icon="fluent:delete-48-regular" className="fs-1-3" />
        </button>
      </CustomPopper>
    </>
  );
};

export default CategoryActions;

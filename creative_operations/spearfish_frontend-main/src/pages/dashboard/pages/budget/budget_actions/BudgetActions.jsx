import { Icon } from "@iconify/react";
import CustomPopper from "../../../../../components/popper";
import AddCategory from "./AddCategory";
import useModal from '../../../../../components/modal/useModal';

const BudgetActions = ({ data }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const categoriesInBudget = data?.getCategoriesInBudget || [];
  const categoriesInBudgetIDs = categoriesInBudget.map((item) => (item.category._id));

  return (
    <>
      <AddCategory isOpen={isOpen} closeModal={closeModal} categoriesInBudget={categoriesInBudgetIDs} />
      <CustomPopper text='Add dial'>
        <button className="action-btns" onClick={openModal}>
          <Icon icon="cil:playlist-add" className="fs-1-3" />
        </button>
      </CustomPopper>
    </>
  );
};

export default BudgetActions;

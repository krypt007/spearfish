import Table from "../../../../../../components/Tables";
import categories from "../../../../../../global/categories/metaData";
import { Icon } from "@iconify/react";

const Budgets = () => {
  const headerTitles = ['#', 'Budget', 'description',
    'Amount', 'Spent', 'Balance'];
  const mobileHeaderTitles = ['Budget', 'Amount', 'Balance', ''];

  const TableRows = () => {
    return (
      <>
        {categories.map((category, index) => (
          <tr key={index}>
            <td><input type="checkbox" name="" id="" /></td>
            <td className='flex-row flex-start align-center'>
              <span className='icon flex-row-center align-center'>
                <Icon icon={category.icon} />
              </span>{category.name}
            </td>
            <td>Help sorting out rent amoun...</td>
            <td>$3000</td>
            <td>$2800</td>
            <td>$200</td>
          </tr>
        ))}
      </>
    );
  };

  const MobileRows = () => {
    return (
      <>
        {categories.map((category, index) => (
          <tr key={index}>
            <td className='flex-row flex-start align-center'>
              <span className='icon flex-row-center align-center'>
                <Icon icon={category.icon} />
              </span>{category.name}
            </td>
            <td>$3000</td>
            <td>$3000</td>
            <td className="fs-1-2 c-secondary-2"><Icon icon='line-md:chevron-small-right' /></td>
          </tr>
        ))}
      </>
    );
  }

  return (
    <>
      <Table Rows={TableRows} headerTitles={headerTitles} />
      <Table Rows={MobileRows} headerTitles={mobileHeaderTitles} classes='mobile-table' />
    </>
  );
};

export default Budgets;

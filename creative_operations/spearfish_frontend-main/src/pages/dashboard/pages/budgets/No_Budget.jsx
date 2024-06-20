import NoData from '../../../../components/no_data/NoData';

const NoBudget = () => {
  return (
    <>
      <NoData text='No budget available.' navLink='/budget/new'
        navLinkText='Create budget'
      />
    </>
  );
};

export default NoBudget;

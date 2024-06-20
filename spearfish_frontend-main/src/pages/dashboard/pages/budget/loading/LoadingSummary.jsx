import LoadingOverviewItem from "./LoadingOverviewItem";

const LoadingSummary = () => {
  return (
    <section className="budgets-summary flex-row space-between">
      <div className='overview-items flex-row space-around'>
        <LoadingOverviewItem />
        <LoadingOverviewItem />
      </div>
      <div className='overview-items flex-row space-around align-center'>
        <LoadingOverviewItem />
        <LoadingOverviewItem />
      </div>
    </section>
  );
};

export default LoadingSummary;

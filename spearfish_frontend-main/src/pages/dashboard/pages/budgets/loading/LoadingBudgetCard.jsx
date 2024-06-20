import Skeleton from "react-loading-skeleton";

const LoadingBudgetCard = () => {
  return (
    <div className="budget-card flex-row space-between align-center gap-10 mt-20">
      <div className='flex-row space-between align-center info' style={{ padding: '5px 10px' }}>
        <div className='flex-row flex-start'>
          <div className="mr-10">
            <Skeleton width={40} height={40} />
          </div>
          <div className="details not-in-mobile">
            <Skeleton width={80} />
            <Skeleton width={40} height={10} />
          </div>
        </div>
        <div className='flex-row-center align-center gap-10'>
          <div className="details">
            <Skeleton width={70} />
            <Skeleton width={40} height={10} />
          </div>
          <div className="details">
            <Skeleton width={70} />
            <Skeleton width={40} height={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBudgetCard;

import Skeleton from "react-loading-skeleton";

const Activity = () => {
  return (
    <div className="item flex-row space-between align-center">
      <div className='flex-row flex-start align-center'>
        <div className="icon flex-row-center align-center fs-1-2 mr-10">
          <Skeleton width={40} height={40} />
        </div>
        <div>
          <Skeleton width={70} />
          <Skeleton width={50} height={7} />
        </div>
      </div>
      <div className='amount fw-bold c-secondary-2'>
        <Skeleton width={30} />
      </div>
    </div>
  );
};


const LoadingActivities = () => {
  return (
    <>
      {Array(3).fill(0).map((_, index) => (<Activity key={index} />))}
    </>
  );
};

export default LoadingActivities;

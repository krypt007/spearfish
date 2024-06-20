import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const DialLoading = () => {
  return (
    <div className="row closed">
      <div className="upper flex-row space-between align-center">
        <div className='flex-row flex-start align-center large-width'>
          <Skeleton width={40} height={40} borderRadius={10} className='mr-10' />
          <div>
            <Skeleton width={100} />
            <Skeleton width={70} height={7} />
          </div>
        </div>
        <div className="hide-on-mobile">
          <Skeleton width={60} height={7} />
        </div>
        <div>
          <Skeleton width={70} height={7} />
        </div>
        <div className='flex-column-center align-center mr-10 fs-1-1 opened-indicator'>
          <Skeleton width={25} height={20} />
        </div>
      </div>
    </div>
  );
};

const LoadingRows = () => {
  return (
    <SkeletonTheme baseColor="#b8b8b8" highlightColor="#dedede">
      {Array(3).fill(0).map((_, index) => (<DialLoading key={index} />))}
    </SkeletonTheme>
  );
};

export default LoadingRows;

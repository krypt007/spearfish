import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingOverviewItem = () => {
  return (
    <SkeletonTheme baseColor="#dab3ff" highlightColor="#e5c9ff">
      <div className='item flex-row'>
        <div className="mr-20">
          <Skeleton width={40} height={40} />
        </div>
        <div className='item-content'>
          <Skeleton width={60} height={10} />
          <Skeleton width={50} />
          <Skeleton width={60} height={5} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default LoadingOverviewItem;

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingDialOverview = () => {
  return (
    <SkeletonTheme baseColor="#ceced9" highlightColor="#e6e6f2">
      <div className='category-overview flex-row space-between align-center'>
        <div className="cards flex-row space-between">
          <div className="card flex-row space-between align-center">
            <Skeleton width={40} height={40} />
            <div className='details text-align-right'>
              <Skeleton width={100} height={7} />
              <Skeleton width={70} />
              <Skeleton width={60} height={7} />
            </div>
          </div>
          <div className="card">
            <div className="flex-row space-between align-center">
              <Skeleton width={40} height={40} />
              <div className='details text-align-right'>
                <Skeleton width={100} height={7} />
                <Skeleton width={70} />
              </div>
            </div>
            <div className='text-align-right c-text-secondary mt-10'>
              <Skeleton height={7} />
            </div>
          </div>
          <div className="card flex-row space-between align-center">
            <Skeleton width={40} height={40} />
            <div className='details text-align-right'>
              <Skeleton width={100} height={7} />
              <Skeleton width={70} />
              <Skeleton width={60} height={7} />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default LoadingDialOverview;

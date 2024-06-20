import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingBudgetsSummary = () => {
  return (
    <SkeletonTheme baseColor="#383838" highlightColor="#6b6b6b">
      <div className='overview-item mb-20'>
        <div className="upper flex-row space-between">
          <div className='flex-row flex-start'>
            <div className="mr-20 flex-row-center">
              <Skeleton width={40} height={40} />
            </div>
            <div className="details">
              <div className='flex-row space-between align-center gap-20'>
                <div>
                  <Skeleton width={40} height={10} />
                  <Skeleton width={60} height={10} />
                </div>
                <div>
                  <Skeleton width={40} height={10} />
                  <Skeleton width={60} height={10} />
                </div>
              </div>
              {/* <p className='fs-0-8 dull-white'>The current active balance</p> */}
            </div>
          </div>
          <Skeleton width={30} height={30} borderRadius={5} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default LoadingBudgetsSummary;

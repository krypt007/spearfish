import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingMyBudget = () => {
  return (
    <SkeletonTheme baseColor="#9486d9" highlightColor="#a091eb">
      <div className='overview-item mb-20'>
        <div className="upper flex-row space-between align-center">
          <div className='flex-row flex-start mb-5'>
            <div className="icon mr-20 flex-row-center">
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
          <div className="flex-column-center">
            <div>
              <Skeleton height={30} />
            </div>
          </div>
        </div>
        <div className="lower">
          <div className="progress-bar">
            <Skeleton height={10} />
          </div>
          <div className='flex-row space-between align-center'>
            <Skeleton width={30} height={10} />
            <Skeleton width={30} height={10} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default LoadingMyBudget;

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingCategories = () => {
  return (
    <SkeletonTheme baseColor="#b0b0b0" highlightColor="#d9d9d9">
      <div className="categories-container flex-row flex-start">
        {Array(3).fill(0).map((_, index) => (
          <div className='category-card' style={{ background: '#e6e9f0' }} key={index}>
            <div className='m-tb-10 content'>
              <Skeleton width={70} />
              <div style={{ minHeight: '50px' }}>
                <Skeleton height={7} />
                <Skeleton width={'50%'} height={7} />
              </div>
              <div className='flex-row space-between align-center'>
                <Skeleton width={50} height={7} />
                <Skeleton width={70} height={30} borderRadius={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default LoadingCategories;

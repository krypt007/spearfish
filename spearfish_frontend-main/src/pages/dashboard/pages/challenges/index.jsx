// import { Icon } from '@iconify/react';
import Template from '../../Template';
import './challenges.scss';
// import ProgressBar from './ProgressBar';
import SEO from '../../../../components/SEO';

const WeAreDoingSomeWorkHere = () => {
  return (
    <div className='challenge-overview-cont m-tb-20 flex-row space-between align-center'>
      <div className="challenge-intro">
        <p className='fs-0-8 with-bg'>Coming soon</p>
        <p className='fs-1-2 m-tb-10 fw-600 text-gradient'>We are doing some work here</p>
        <p className='fs-0-8'>
          We will help you save by earning points and rewards when you complete
          tasks and challenges set out. You also get to compare your progress to friends
          and other players, so it&#8217;s competitive too!
        </p>
        <div className='flex-row flex-end image'>
          <img src="/images/goal.png" alt="dabodabo" />
        </div>
      </div>
    </div>
  );
};

// const Challenge = () => {
//   return (
//     <div className='challenge-container flex-row space-between'>
//       <div className='flex-row flex-start'>
//         <div className="challenge-icon mr-20">
//           <img src="/images/welcome.jpg" alt="challenge" />
//         </div>
//         <div className="challenge-content">
//           <p className='fw-bold fs-1-1 mb-5'>Dabo dabo challenge</p>
//           <p className='fs-0-8'>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
//           <div className='actions mt-10'>
//             <p className='fs-0-7 dull-black flex-row flex-start'>
//               <span className='flex-row flex-start align-center mr-10'><Icon icon='entypo:dot-single' /> Join challenge</span>
//               <span className='flex-row flex-start align-center'><Icon icon='entypo:dot-single' /> Upvote</span>
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="upvote-icon flex-column-center align-center">
//         <Icon icon='akar-icons:triangle-up' />
//         <p className='fs-0-8'>0</p>
//       </div>
//     </div>
//   );
// };

const Challenges = () => {

  return (
    <Template marginContent={'20px 20px 120px 20px'} pageTitle='Challenges'>
      <SEO title='Moonfish saving challenges' description='Gamified way to help you save' />
      {/* <div className='flex-row flex-start align-center fw-600'>
        <p className='mr-20'>Ongoing</p>
        <p className='dull-black'>Completed</p>
      </div> */}
      {/* <div className='challenge-overview-cont m-tb-20 flex-row space-between align-center'>
        <div className="challenge-intro">
          <p className='fs-0-8 with-bg'>01 Jun - 27 May</p>
          <p className='fs-1-2 m-tb-10 fw-600 text-gradient'>Dabo dabo challenge</p>
          <p className='fs-0-8'>
            In publishing and graphic design, Lorem ipsum is a placeholder
            text commonly used to demonstrate the visual form of a
            document or a typeface.
          </p>
          <div className='flex-row flex-end image'>
            <img src="/images/goal.png" alt="dabodabo" />
          </div>
        </div>
        <div className='challenge-overview flex-column space-between'>
          <div className='lower flex-row space-between'>
            <div className='small-content-card flex-column-center align-center'>
              <div className='title-indicator flex-row flex-start align-center'>
                <Icon icon='system-uicons:coins' className='c-secondary-1' />
                <p className='fs-0-8 fw-bold'>Balance</p>
              </div>
              <p className='fs-0-7'>TOTAL AMOUNT</p>
              <div className='flex-row flex-start align-center'>
                <Icon icon='system-uicons:coins' className='mr-10 big-p dull-black' />
                <p className='big-p fw-600'>$3,000</p>
              </div>
              <p className='with-bg fs-0-8 flex-row flex-start align-center m-tb-5'>
                <span>Next due:</span> <Icon icon='system-uicons:coins' className='ml-5' />
                <span>$2000</span>
              </p>
            </div>
            <div className='progress-bar-container flex-column-center align-center'>
              <ProgressBar classes={'progress-bar'} />
              <p className='fs-0-8 fw-600 text-align-center text-gradient'>Progress</p>
            </div>
          </div>
          <div className='large-content-card flex-row space-between align-center'>
            <div className='details-container flex-row space-between align-center'>
              <div className='details'>
                <div className='mb-5'>
                  <p className='fs-0-7'>Previous amount</p>
                  <p className='text-gradient fw-bold fs-0-9'>$2000</p>
                </div>
                <div>
                  <p className='fs-0-7'>Next due amount</p>
                  <p className='text-gradient fw-bold fs-0-9'>$2000</p>
                </div>
              </div>
              <div className='details'>
                <div className='mb-5'>
                  <p className='fs-0-7'>Previous date</p>
                  <p className='text-gradient fw-bold fs-0-9'>27 Sep 2022</p>
                </div>
                <div>
                  <p className='fs-0-7'>Next due date</p>
                  <p className='text-gradient fw-bold fs-0-9'>27 Sep 2022</p>
                </div>
              </div>
            </div>
            <div className='btn-container'>
              <button className='flex-row-center align-center mb-5'>
                <Icon icon='carbon:touch-interaction' className='mr-5' /> Actions
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className='m-tb-40'>
        <p className='m-tb-20 fw-600'>Challenges</p>
        <div className='challenges-list'>
          <Challenge />
        </div>
      </div> */}
      <WeAreDoingSomeWorkHere />
    </Template>
  );
};

export default Challenges;

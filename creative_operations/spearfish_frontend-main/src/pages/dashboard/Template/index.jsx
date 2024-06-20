import RightBar from '../sections/right_bar';
import LeftBar from '../sections/left_bar';
import Content from '../sections/content';
import BottomNav from '../sections/bottom_nav_bar';
import UpperNav from '../sections/upper_nav';
import './index.scss';


const Template = ({ children, marginContent, pageTitle }) => {
  return (
    <>
      <UpperNav title={pageTitle} />
      <section className='flex-row space-between dashboard-container'>
        <LeftBar />
        <Content margin={marginContent} pageTitle={pageTitle}>
          {children}
        </Content>
        <RightBar />
      </section>
      <BottomNav />
    </>
  );
};

export default Template;

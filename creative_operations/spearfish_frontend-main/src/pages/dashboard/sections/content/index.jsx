import TopNav from './TopNav';

const Content = ({ children, margin, pageTitle }) => {
  return (
    <section className='dashboard-content'>
      <TopNav pageTitle={pageTitle} />
      <div style={{ margin }}>{children}</div>
    </section>
  );
};

export default Content;

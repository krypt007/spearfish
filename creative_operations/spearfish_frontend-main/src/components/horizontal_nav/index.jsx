import './horizontal_nav.scss';

const HorizontalNav = ({ links, activeLink, setActiveLink }) => {
  return (
    <div className='horizontal-nav flex-row flex-start align-center m-tb-20'>
      {links.map(({ name }, index) => (
        <div className={`link ${activeLink === index && 'active'}`} onClick={() => setActiveLink(index)} key={index}>
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};

export default HorizontalNav;

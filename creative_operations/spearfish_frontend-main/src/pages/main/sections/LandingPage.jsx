import './sections.scss';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const LandingPage = () => {
  return (
    <section className='landing-section flex-row-center align-center'>
      <div className='landing-container flex-row-center align-center'>
        <div className="content">
          <p style={{ fontSize: '3rem' }}>Save with a <br />
            <span className='fw-bold' style={{ display: 'block', marginTop: '-20px' }}>
              purpose
            </span>
          </p>
          <p style={{ marginBottom: '50px' }}>
            What we invest in is what determines the growth and development of not just our
            children but our communities. <br />
            We must begin to reassess the products and services that we are
            investing in and ensure they are like minded with our thoughts and dreams. <br />
            Savings is not just about securing our lives but expanding the lives of
            our loved ones and people we believe in.
          </p>
          <Link to={'/dashboard'} className='link-no-decoration'>
            <button className='fw-500 flex-row-center align-center'>
              Start saving <Icon className='ml-10' icon='gg:chevron-right-o' />
            </button>
          </Link>
        </div>
        <div className="image">
          <div className="image-container">
            <img src="/images/landing.png" alt="savings" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingPage;

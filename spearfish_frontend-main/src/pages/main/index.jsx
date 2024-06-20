import './main.scss';
import NavigationBar from "./navigation";
import LandingPageContent from './sections/Content';
import Footer from './sections/Footer';
import LandingPage from './sections/LandingPage';

const MainPage = () => {
  return (
    <>
      <NavigationBar />
      <div className='width-90-m-auto'>
        <LandingPage />
        <LandingPageContent />
      </div>
      <Footer />
    </>
  );
}

export default MainPage;

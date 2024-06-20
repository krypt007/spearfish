import PropagateLoader from "react-spinners/PropagateLoader";
import BarLoader from "react-spinners/BarLoader";
import PulseLoader from "react-spinners/PulseLoader";
import './spinner.scss';
import styles from '../../global/styles/_variables.scss';

const PageSpinner = ({ loaderType, pMargin }) => {
  const { bgSecondary1 } = styles;
  const types = {
    'bar': <BarLoader color={bgSecondary1} />,
    'propagate': <PropagateLoader color={bgSecondary1} />,
    'pulse': <PulseLoader color={bgSecondary1} />,
  }

  const getLoader = () => {
    return types[loaderType] || types.bar;
  }

  return (
    <div id='page-spinner' className='flex-column-center align-center'>
      {getLoader()}
      <p className='fs-0-8 dull-black' style={{ margin: pMargin }}>Beep Bop!, Loading ... Please wait</p>
    </div>
  );
};

export default PageSpinner;

import styles from '../../../../global/styles/_variables.scss';
// Import react-circular-progressbar module and styles
import {
  buildStyles, CircularProgressbar
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import GradientSVG from './GradientSVG';

const ProgressBar = ({ classes }) => {
  const circleProgress = buildStyles({
    backgroundColor: styles.bgPrimary,
    textColor: styles.bgSecondary1,
    pathColor: styles.bgSecondary1,
    trailColor: "transparent",
  });

  return (
    <div className={`${classes}`}>
      <GradientSVG idCSS='idCSS' startColor={styles.bgSecondary1}
        endColor={styles.bgSecondary2} rotation={90}
      />
      <CircularProgressbar
        value={60}
        text={`${60}%`}
        background
        backgroundPadding={6}
        styles={{
          ...circleProgress,
          path: {
            stroke: `url(#idCSS)`, height: '100%',
          },
        }}
      />
    </div>
  );
};

export default ProgressBar;

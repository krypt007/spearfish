import { Box, Popper } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import { useEffect, useRef, useState } from 'react';
import './popper.scss';


/**
 * @method CustomPopper component
 * @description Custom Popper component that displays the popper
 * @param {Object} props - Properties of the component
 * @returns {JSX} Popper component
 */
const CustomPopper = ({ text, children }) => {
  const anchor = useRef(null);
  const [open, setOpen] = useState(false);
  const popperId = Math.random() * 10000;
  // const classes = useStyles();

  useEffect(() => {
    const anchorEl = anchor.current;
    anchorEl.onmouseover = handleHover;
    anchorEl.onmouseleave = handleMouseLeave;
  });

  /**
   * @method handleHover
   * @description Handle the mouse over event
   */
  const handleHover = () => {
    setOpen(true);
  };

  /**
   * @method handleMouseLeave
   * @description Handle the mouse out event
   */
  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <Box component='span' ref={anchor} aria-describedby={popperId}>
      {children}
      <Popper
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ]}
        // placement='bottom'
        id={popperId} open={open}
        anchorEl={anchor.current} className='popper'>
        {text || 'Add text'}
      </Popper>
    </Box>
  );
};


// const useStyles = makeStyles((theme) => ({

// }));

export default CustomPopper;

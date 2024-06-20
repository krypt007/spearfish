/**
 * @method StickyContainer component
 * @param {JSX} children The children param of the sticky container component
 * @param {Int} top The top pixel value of the sticky container 
 * @returns {JSX} The sticky container component
 */
const StickyContainer = ({ children, top, classes, styles }) => {
  return (
    <div className={`sticky ${classes}`} style={{ top: `${top}px`, ...styles }}>
      {children}
    </div>
  )
}

export default StickyContainer

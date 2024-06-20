import { Icon } from "@iconify/react";

const CustomButton = ({ loading, description, classes, styles, onClick, children }) => {
  return (
    <button className={`flex-row-center align-center ${classes}`} style={{ ...styles }} type="button" onClick={onClick} disabled={loading}>
      {loading ? (
        <Icon icon='line-md:loading-twotone-loop' className="fs-1-5" />
      ) : (description || children)}
    </button>
  )
}

export default CustomButton;

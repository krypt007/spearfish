import { useEffect, useState, useRef } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useClickOutside = () => {
  const ref = useRef(null);
  const [isOutside, setIsOutside] = useState(false);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOutside(() => true);
      } else {
        setIsOutside(() => false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return [ref, isOutside];
}

export default useClickOutside;

/** @returns {HTMLElement|undefined} */
export const getHashElement = (hashValue) => {
  if (window.location.hash) {
    return document.querySelector(window.location.hash);
  }
  return document.querySelector(hashValue);
}

/** @param {number} offset */
export const scrollToHashElement = (offset = 0, hashValue = null) => {
  const elementToScroll = getHashElement(hashValue);

  return elementToScroll
    ? window.scrollTo({
      top: elementToScroll.offsetTop - offset,
      behavior: "smooth"
    })
    : undefined;
};

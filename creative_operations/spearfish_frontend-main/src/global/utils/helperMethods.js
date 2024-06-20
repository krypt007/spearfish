import moment from 'moment';

/**
 * @method isEmpty
 * @description checks if a string is empty
 * @param {String} val 
 * @returns {Boolean} string is empty or not
 */
export const isEmpty = (val) => {
  return (val.trim().length === 0 || val.trim() === '');
}

/**
 * @method capitalize
 * @description capitalize the first letter of a string
 * @param {String} val 
 * @returns 
 */
export const capitalize = (val) => {
  if (typeof val !== 'string') return val;
  const valLower = val.toLowerCase();
  const str = valLower.charAt(0).toUpperCase() + valLower.slice(1);
  return str;
}

export const isNumeric = (val) => {
  return (!isNaN(val));
}

/**
 * @method validEmail
 * @description checks if an email string is valid
 * @param {String} email 
 * @returns {Boolean} true if valid email otherwise false
 */
export const validEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * @method isEmptyObject
 * @description checks if an object is empty or not
 * @param {Object} obj to check if it's empty
 * @returns {Boolean} True if object is empty otherwise False
 */
export const isEmptyObject = (obj) => {
  return obj // 👈 null and undefined check
    && Object.keys(obj).length === 0
    && Object.getPrototypeOf(obj) === Object.prototype;
}

/**
 * @method elapsedTimeString
 * @description get elapsed time from today in string
 * @param {*} publishedAt 
 * @returns {String}
 */
export const elapsedTimeString = (publishedAt) => {
  const elapsed = moment(publishedAt);
  if (elapsed.isValid()) {
    return elapsed.fromNow();
  }
  return 'unspecified date';
};

/**
 * @method dateToString
 * @description get string from the date object
 * @param {Date} date to get the string from
 * @returns {String} date string
 */
export const dateToString = (date, short = false) => {
  const dateString = short ? moment(date).format('ll') : moment(date).format('LL');
  return dateString;
}

export const getCurrentDate = () => {
  const dateString = moment().format('LL');
  return dateString;
}

/**
 * @method formatNumber
 * @description formats a number with a ',' separator if set to that locale on your computer
 * @param {Number} num the number to format with ',' separator 
 * @returns {String} formated string number
 */
export const formatNumber = (num) => {
  if (!isNumeric(num)) return num;
  return num.toLocaleString();
}

/**
 * @method clamp
 * @description clamp number between min and max value
 * @param {Number} num number to clamp 
 * @param {Number} min minimum value
 * @param {Number} max maximum value
 * @returns {Number} clamped number
 */
export const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
}


export const getFirstName = (name) => {
  if (!name) return;
  if (name.length === 1) return name;
  return name.split(' ')[0];
}

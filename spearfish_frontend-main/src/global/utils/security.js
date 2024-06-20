import { AES, enc } from 'crypto-js';

/**
 * @method encrypt
 * @description encrypt token to cipher text
 * @param {String} token string that is being encrypted
 * @returns {String} encrypted text
 */
const encrypt = async (token) => {
  const cipherText = AES.encrypt(token, process.env.REACT_APP_SECRET_KEY);
  return cipherText.toString();
}

/**
 * @method decrypt
 * @description dencrypt an existing cipher text
 * @param {String} cipherText string that was encrypted
 * @returns {String} decryted
 */
const decrypt = async (cipherText, secret_key) => {
  const bytes = AES.decrypt(cipherText, secret_key);
  const decrypted = bytes.toString(enc.Utf8);
  return decrypted;
}

/**
 * @method saveToSessionStorage
 * @description save data to the session storage
 * @param {String} k key to be used to store the value to the session storage
 * @param {*} v value to be stored to the session storage
 * @returns {void} value retrieved
 */
const saveToSessionStorage = async (k, v) => {
  await sessionStorage.setItem(k, v);
}

/**
 * @method getFromSessionStorage
 * @description retrieve data from the session storage
 * @param {String} k key that was used to store the value to the session storage
 * @returns {*} value retrieved
 */
const getFromSessionStorage = async (k) => {
  const item = await sessionStorage.getItem(k);
  return item;
}

/**
 * @method deleteFromSessionStorage
 * @description delete data from the session storage
 * @param {String} k key to delete from the session storage
 * @returns {void}
 */
const deleteFromSessionStorage = (k) => {
  sessionStorage.removeItem(k);
}

/**
 * @method saveJWT
 * @description save JWT to the session storage
 * @param {String} token JWT token
 * @returns {saved token}
 */
const saveJWT = async (token) => {
  if (!token) return null;
  const encryptedToken = await encrypt(token);
  await saveToSessionStorage('jwt', encryptedToken);
  return encryptedToken;
}

/**
 * @method getJWT
 * @description retrieves the JWT from to session storage
 * @param {*} secret_key key used to encrypt the token
 * @returns 
 */
const getJWT = async (secret_key) => {
  const savedToken = await getFromSessionStorage('jwt');
  if (!savedToken) return null;
  try {
    const token = decrypt(savedToken, secret_key);
    return token;
  } catch (err) {
    return null;
  }
}

/**
 * @method deleteJWT
 * @description delete JWT from session storage
 * @returns {void}
 */
const deleteJWT = () => {
  deleteFromSessionStorage('jwt');
}

export { saveJWT, getJWT, getFromSessionStorage, saveToSessionStorage, deleteJWT, deleteFromSessionStorage };

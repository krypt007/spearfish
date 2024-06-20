'use strict'
const User = require('../../../db/models/user');
const crypto = require('crypto');
const Mailer = require('../../../utils/mailer');
const { badRequest } = require('../../../utils/errorHandling');
const { generateJWT } = require('../../../utils/auth');

module.exports = {
  /**
   * @method createUser
   * @description create user in the system
   * @param firstName
   * @param lastName
   * @param email
   * @param password
   * @param acceptedTerms
   * @returns {Promise<User>}
   */
  async createUser({ firstName, lastName, email, password, acceptedTerms }) {
    const name = `${firstName} ${lastName}`;
    const existing = await User.findOne({ 'email.address': email });

    if (existing) {
      return badRequest("That email has already been used for registration");
    }

    const verificationCode = crypto.randomInt(100000, 1000000);
    const recoveryToken = crypto.randomBytes(48).toString('hex');
    const data = {
      name,
      email: {
        address: email,
        verificationCode,
        recoveryToken
      },
      acceptedTerms
    }

    const newUser = new User(data);
    newUser.setPassword(password);

    const sendCode = verificationCode.toString().padStart(6, "0");
    const params = `address=${data.email.address}&pid=${recoveryToken}`
    const mailInformation = `<p>Your verification code is ${sendCode}. 
                                <a href="${process.env.SITE_URL}/verify?${params}">
                                    Click here to verify
                                </a>
                             <p>`;

    const mailer = new Mailer(null, data.email.address,
      'Moonfish verification code', null, mailInformation);
    try {
      await mailer.useGmail();
    } catch (err) {
      badRequest(err.message)
      console.log(err.message);
    }
    return await newUser.save();
  },

  /**
   * @method getUser
   * @description retrieve a user by id or email
   * @param id generated by mongo
   * @param email
   * @returns {Promise<User>}
   */
  async getUser(id = null, email = null) {
    const query = {};
    if (id) query['_id'] = id;
    if (email) query['email.address'] = email;
    return User.findOne(query);
  },

  /**
   * @method verifyEmail
   * @description verifies user email through provided verification code
   * @param email users email address
   * @param verificationCode verification code sent via email
   * @param pid code to be used to authorize email verification
   * @returns {Promise<boolean>}
   */
  async verifyEmail(email, verificationCode, pid) {
    const user = await this.getUser(null, email);
    if (!user) {
      return badRequest('User does not exist');
    }

    if (user.email.recoveryToken !== pid) {
      return badRequest('Invalid request. Link must be broken');
    }

    if (user.email.verified) {
      return badRequest('Your email has already been verified');
    }
    if (user.email.verificationCode !== parseInt(verificationCode)) {
      return badRequest('Invalid verification code provided');
    }

    user.email.verified = true;
    await user.save()

    return true;
  },

  /**
   * @method loginUser
   * @description give user permission to access the system
   * @param email
   * @param password
   * @returns {Promise<{user, token}>}
   */
  async loginUser(email, password) {
    const user = await User.findOne({ 'email.address': email });
    if (!user) {
      return badRequest('Invalid login credentials provided');
    }

    if (!user.email.verified) {
      return badRequest('Email has not yet been verified');
    }

    if (!user.validPassword(password)) {
      return badRequest('Invalid login credentials provided');
    }

    const payloadUser = user.toObject();
    delete payloadUser['hash'];
    delete payloadUser['salt'];
    payloadUser['_id'] = payloadUser._id.toString()

    const token = await generateJWT({ user: payloadUser });

    return {
      token,
      user
    }
  },

  /**
   * @method sendAccountResetEmail
   * @description send password reset to the email provided
   * @param email email provided
   * @returns {Promise<{recoveryToken: string}>}
   */
  async sendAccountResetEmail(email) {
    const existingUser = await User.findOne({ 'email.address': email });
    if (!existingUser) {
      return { recoveryToken: '' };
    }

    const recoveryToken = crypto.randomBytes(48).toString('hex');
    existingUser.email['recoveryToken'] = recoveryToken;
    await existingUser.save();

    // Send email
    const params = `address=${email}&pid=${recoveryToken}`
    const mailInformation = `<p>You made a request to reset your password. 
                                <a href="${process.env.SITE_URL}/reset?${params}">
                                    Click to proceed.
                                </a>
                             <p>`;
    const mailer = new Mailer(null, email,
      'Moonfish password recovery', null, mailInformation);
    try {
      await mailer.useGmail();
    } catch (err) {
      console.log(err.message);
      badRequest(err.message);
    }

    return {
      recoveryToken
    }
  },

  /**
   * @method resetPassword
   * @description resets a users password
   * @param email of the user
   * @param password new password of the user
   * @param recoveryToken token to be used to recover password
   * @returns {Promise<Boolean>}
   */
  async resetPassword(email, password, recoveryToken) {
    const existingUser = await User.findOne({ 'email.address': email });
    if (!existingUser) {
      return badRequest('Invalid request. Please use the link sent via email');
    }
    if (existingUser.email['recoveryToken'] !== recoveryToken) {
      return badRequest('Your link must have been broken. Use the link sent via email')
    }

    existingUser.email['recoveryToken'] = crypto.randomBytes(48).toString('hex');
    existingUser.setPassword(password);
    await existingUser.save();
    return true;
  },

  async updateUserDetails(data, user) {
    const userObj = await User.findById(user['_id']);
    if (!userObj) return null;

    const { firstName, lastName, phone, location } = data;
    const updateData = {
      name: `${firstName} ${lastName}`,
      location,
      phone: {
        number: phone,
        verificationCode: 0,
        verified: false
      }
    }

    Object.assign(userObj, updateData);

    const newUserData = await userObj.save();
    const token = await generateJWT({ user: newUserData });

    return {
      token,
      user: newUserData
    }
  }
}
'use strict'
const logic = require('../logic');
const requireLogin = require('../../../utils/requireLogin');

module.exports = {
    async getUser(parent, {id, email}, context) {
        requireLogin(context);
        return await logic.getUser(id, email);
    },

    async login(parent, {email, password}) {
        return await logic.loginUser(email, password);
    }
};

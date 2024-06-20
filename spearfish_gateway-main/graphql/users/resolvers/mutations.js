'use strict'
const logic = require('../logic');
const requireLogin = require('../../../utils/requireLogin');

module.exports = {
    async createUser(parent, { data }) {
        return await logic.createUser(data);
    },

    async verifyEmail(parent, {data}) {
        const { email, code, pid } = data;
        return await logic.verifyEmail(email, code, pid);
    },

    async sendAccountResetEmail(parent, {email}) {
        return await logic.sendAccountResetEmail(email);
    },

    async resetPassword(parent, { data }) {
        const { email, password, recoveryToken } = data;
        return await logic.resetPassword(email, password, recoveryToken);
    },

    async updateUserDetails(parent, { data }, context) {
        const { user } = requireLogin(context);
        return await logic.updateUserDetails(data, user);
    }
};

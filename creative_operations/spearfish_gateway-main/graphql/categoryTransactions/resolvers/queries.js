'use strict'
const requireLogin = require('../../../utils/requireLogin');
const logic = require('../logic');

module.exports = {
    async getCategoryTransactions(parent, { data }, context) {
        const { user } = requireLogin(context);
        return await logic.getCategoryTransactions(data, user);
    },

    async recentActivities(parent, _, context) {
        const { user } = requireLogin(context);
        return await logic.recentActivities(user);
    }
}

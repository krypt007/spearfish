const requireLogin = require('../../../utils/requireLogin');
const logic = require('../logic');

module.exports = {
    async createBudget(parent, {data}, context) {
        const { user } = requireLogin(context);
        return await logic.createBudget(data, user);
    },

    async editBudget(parent, { id, data }, context) {
        const { user } = requireLogin(context);
        return await logic.editBudget(id, data, user);
    },

    async deleteBudget(parent, { id }, context) {
        const { user } = requireLogin(context);
        return await logic.deleteBudget(id, user);
    }
}
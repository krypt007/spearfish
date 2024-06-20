const requireLogin = require('../../../utils/requireLogin');
const logic = require('../logic');

module.exports = {
    async getBudgets(parent, { data }, context) {
        const { user } = requireLogin(context);
        return await logic.getBudgets(data, user);
    },

    async getBudget(parent, { query }, context) {
        const { user } = requireLogin(context);
        return await logic.getBudget(query, user);
    }
}

const requireLogin = require('../../../utils/requireLogin');
const logic = require('../logic');

module.exports = {
    async deleteCategory(parent, { budgetId, categoryId }, context) {
        const { user } = requireLogin(context);
        return await logic.deleteCategory(budgetId, categoryId, user);
    },

    async editCategory(parent, { query, data }, context) {
        const { user } = requireLogin(context);
        return await logic.editCategory(query, data, user);
    },

    async addCategoryToBudget(parent, { budgetId, data }, context) {
        const { user } = requireLogin(context);
        return await logic.addCategoryToBudget(budgetId, data, user);
    }
}

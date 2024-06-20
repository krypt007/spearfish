const logic = require('../logic');
const requireLogin = require('../../../utils/requireLogin');


module.exports = {
  async defaultCategories(parent, _, context) {
    requireLogin(context);
    return await logic.defaultCategories();
  },

  async getCategoriesInBudget(parent, { budget_id }, context) {
    const { user } = requireLogin(context);
    return await logic.getCategoriesInBudget(budget_id, user);
  },

  async getCategory(parent, { budget_id, category_id }, context) {
    const { user } = requireLogin(context);
    return await logic.getCategory(budget_id, category_id, user);
  }
}

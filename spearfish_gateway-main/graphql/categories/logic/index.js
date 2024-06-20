const Category = require('../../../db/models/category');
const { getBudget } = require('../../budgets/logic');
const CategoryTransaction = require('../../../db/models/categoryTransaction');

module.exports = {
  /**
   * @method defaultCategories
   * @description retrieves the default categories in the system
   * @returns {Promise<[Category]>} array of category objects
   */
  async defaultCategories() {
    return Category.find({ owner: null });
  },

  /**
   * @method getCategoriesInBudget
   * @description retrieves categories in a certain budget
   * @param budget_id the budget the categories belong
   * @param user the owner of the budget
   * @returns {Promise<[Object]>} Array of category metadata objects
   */
  async getCategoriesInBudget(budget_id, user) {
    const budget = await getBudget({ _id: budget_id }, user);
    if (!budget) return [];
    return budget['categories'];
  },

  /**
   * @method getCategory
   * @description retrieves a category depending on it's ID
   * @param budget_id ID of the current budget
   * @param category_id ID of the current category
   * @param user The owner of the current budget
   * @returns {Promise<{}|{category: Category|null, budget: {}|null}>}*/
  async getCategory(budget_id, category_id, user) {
    const budget = await getBudget({ _id: budget_id }, user);
    if (!budget) return { budget: null, category: null };
    const category = budget['categories'].find((item) => item.category._id.toString() === category_id);
    if (!category) return { budget: null, category: null };
    return {
      _category: category,
      budget,
    }
  },

  /**
   * Deletes a category from the budget
   * @param categoryId category with the ID to remove
   * @param budgetId ID of the budget to remove
   * @param user the owner of the budget and category
   * @returns {Promise<Category>}
   */
  async deleteCategory(budgetId, categoryId, user) {
    const { _category, budget } = await this.getCategory(budgetId, categoryId, user);
    if (!_category || !budget) return null;
    budget.savings = _category.amount;
    const categories = budget.categories;
    const categoryIndex = categories.findIndex((item) => item.category._id.toString() === categoryId);
    budget.categories.splice(categoryIndex, 1);
    await CategoryTransaction.deleteMany({
      category: categoryId,
      budget: budgetId,
      user: user._id
    });
    await budget.save();
    return _category;
  },

  /**
   * @method editCategory
   * @
   * @param query
   * @param data
   * @param user
   * @returns {Promise<null|{[p: string]: *}>}
   */
  async editCategory(query, data, user) {
    const { budgetId, categoryId } = query;
    const { _category, budget } = await this.getCategory(budgetId, categoryId, user);
    if (!_category || !budget) return null;
    const newCategory = { ..._category, ...data };
    budget.amount += (data.amount - _category.amount);
    budget.categories = budget.categories.map((category) => {
      if (category.category._id.toString() === categoryId) {
        return newCategory;
      }
    });

    await budget.save();
    return newCategory;
  },

  async addCategoryToBudget(budgetId, data, user) {
    const { categoryId, amount } = data;
    const budget = await getBudget({ _id: budgetId }, user, false);
    if (!budget) return null;

    const newCategory = {
      category: categoryId,
      amount,
      total_amount: 0
    }

    const amountUsed = budget['categories'].reduce((prev, curr) => (prev + curr.amount) , 0);
    const budgetAmount = budget['amount'];
    const unUsed = budgetAmount - amountUsed;

    if (unUsed < amount) {
      budget['amount'] += (amount - unUsed);
    }

    budget['categories'].push(newCategory);
    const budgetWithAddedCategory = await (await budget.save()).populate('categories.category');
    return budgetWithAddedCategory['categories'];
  }
}

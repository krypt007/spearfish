const Budget = require('../../../db/models/budget');

module.exports = {
    /**
     * @method createBudget
     * @description handle creating of a new budget
     * @param data the data to be used to create new budget
     * @param user the owner of the budget to be created
     * @returns {Promise<Budget>}
     */
    async createBudget(data, user) {
        const { amount, name, categories } = data;
        const newBudgetData = {
            name,
            user: user._id,
            isClosed: false,
            amount,
            categories
        };
        return (await Budget.create(newBudgetData)).populate('categories.category');
    },

    /**
     * @method getBudgets
     * @description handle retrieving of user budgets
     * @param data contains query to be used to retrieve user
     * @param {User} user owner of the budgets
     * @returns {Promise<[Budget]>}
     */
    async getBudgets(data, user) {
        const skip = data?.skip || 0;
        const limit = data?.limit || 10;

        return Budget.find({user: user._id})
            .populate('categories.category').sort({'createdAt': 'desc'})
            .skip(skip).limit(limit);
    },

    /**
     * @method getBudget
     * @description get the budget depending on query
     * @param query query data for the budget
     * @param user the user of the budget
     * @param {Boolean} populate whether to return populated `categories.category` or not
     * @returns {Promise<Budget>} budget object
     */
    async getBudget(query, user, populate=true) {
        query.user = user._id
        if (populate) {
            return Budget.findOne({...query}).populate('categories.category');
        }
        return Budget.findOne({...query});
    },

    /**
     * @method editBudget
     * @description edits an existing budget
     * @param id ID of the budget
     * @param data incoming new data
     * @param user owner of the budget
     * @returns {Promise<Budget>} updated budget
     */
    async editBudget(id, data, user) {
        const query = {
            _id: id,
            user: user._id
        }
        return Budget.findOneAndUpdate(query, data, { new: true }).populate('categories.category');
    },

    /**
     * @method deleteBudget
     * @description delete a specified budget
     * @param id ID of budget to delete
     * @param user Owner of the budget
     * @returns {Promise<Budget>} deleted budget
     */
    async deleteBudget(id, user) {
        const budget = await Budget.findOne({_id: id, user: user._id});
        if (!budget) return null;
        return budget.remove();
    }
}
'use strict'

const CategoryTransaction = require('../../../db/models/categoryTransaction');
const { badRequest } = require('../../../utils/errorHandling');

module.exports = {
    /**
     * @method getCategoryTransactions
     * @description retrieve category transactions depending on category ID, budget ID and user_id
     * @param {Object<{category_id: String, budget_id: String, skip: Number, limit: Number}>} data
     * @param {Object<User>} user
     * @returns {Promise<[CategoryTransaction]>} list of all the transactions
     */
    async getCategoryTransactions(data, user) {
        const { category_id, budget_id } = data;
        const skip = data.skip || 0;
        const limit = data.limit || 10;

        const query = {
            user: user._id,
            category: category_id,
            budget: budget_id
        }

        return CategoryTransaction.find(query).sort({'date': 'desc'}).skip(skip).limit(limit).populate([
            'user', 'category', 'budget'
        ]);
    },

    /**
     * @method createCategoryTransaction
     * @description creates a new transaction in the current category
     * @param {Object<{category_id: String, budget_id: String, amount: Number, description: String}>} data to be used to create transaction
     * @param {Object<User>} user owner of the category to add transaction
     * @returns {CategoryTransaction}, the new created transaction
     */
    async createCategoryTransaction(data, user) {
        const { budget_id, category_id, amount, description, title } = data;
        const newData = {
            user: user._id,
            budget: budget_id,
            category: category_id,
            amount,
            title,
            description,
            date: data.date || Date.now()
        }

        const transaction = await (await CategoryTransaction.create(newData)).populate([
            'category', 'budget'
        ]);

        const budget = transaction.budget;
        const category = budget.categories.find((item) => item.category.toString() === category_id);
        category.total_amount += amount;
        await budget.save();
        return transaction;
    },

    async editCategoryTransaction(data, user) {
        const { category_id, amount, description, title, transaction_id } = data;
        const newData = {
            amount,
            title,
            description,
            date: data.date || Date.now()
        }

        const query = {
            user: user._id,
            _id: transaction_id
        }
        const existingTransaction = await CategoryTransaction.findOne(query);
        const previousAmount = existingTransaction['amount'];
        const newTransaction = await CategoryTransaction.findOneAndUpdate(query,
            newData, { new: true }).populate(['category', 'budget']);
        const budget = newTransaction['budget'];
        const category = budget.categories.find((item) => item.category.toString() === category_id);
        category.total_amount -= previousAmount;
        category.total_amount += amount;
        await budget.save();
        return newTransaction;
    },

    async deleteCategoryTransaction(transaction_id, user) {
        const query = {
            _id: transaction_id,
            user: user._id
        }
        const transaction = await CategoryTransaction.findOne(query).populate('budget');
        if (!transaction) badRequest('Invalid request or transaction id');

        const budget = transaction['budget'];
        const category = budget.categories.find((item) => (
            item.category.toString() === transaction['category'].toString()));
        category.total_amount -= transaction['amount'];
        await budget.save();

        return transaction.remove();
    },

    /**
     * @method recentActivities
     * @description retrieve all the recent activities
     * @param user the owner of the recent transactions
     * @returns {Promise<[CategoryTransaction]>}
     */
    async recentActivities(user) {
        const query = {
            user: user._id,
        }

        return CategoryTransaction.find(query).sort({'date': 'desc'}).limit(4).populate([
            'category', 'budget'
        ]);
    }
}

'use strict'
const logic = require('../logic');
const requireLogin = require('../../../utils/requireLogin');

module.exports = {
    async createCategoryTransaction(parent, { data }, context) {
        const { user } = requireLogin(context);
        return logic.createCategoryTransaction(data, user);
    },

    async editCategoryTransaction(parent, { data }, context) {
        const { user } = requireLogin(context);
        // const user = { _id: "635bae2b07dc13e80622c6d6"};
        return logic.editCategoryTransaction(data, user);
    },

    async deleteCategoryTransaction(parent, { transaction_id }, context) {
        const { user } = requireLogin(context);
        return await logic.deleteCategoryTransaction(transaction_id, user);
    },
}

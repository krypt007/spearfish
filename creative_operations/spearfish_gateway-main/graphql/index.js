const userSchema = require('./users');
const categorySchema = require('./categories');
const budgetSchema = require('./budgets');
const categoryTransactionSchema = require('./categoryTransactions');
const { mergeSchemas } = require('@graphql-tools/schema');

module.exports = mergeSchemas({
    schemas: [userSchema, categorySchema, budgetSchema, categoryTransactionSchema]
});

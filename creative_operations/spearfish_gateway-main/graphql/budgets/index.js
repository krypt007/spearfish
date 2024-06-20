const types = require('./typedefs');
const resolvers = require("./resolvers");
const BuildGraphQLSchema = require('../../utils/buildSchemas');

const buildGraphQLSchema = new BuildGraphQLSchema(types, resolvers);

module.exports = buildGraphQLSchema.schema();

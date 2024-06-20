const gql = require('graphql-tag');
const category = require('./category');
const mutations = require('./mutations');
const queries = require('./queries');
const { User } = require('../../shared/typedefs');

module.exports = gql`
  ${User}
  ${category}
  ${queries}
  ${mutations}
`;

'use strict'

const gql = require('graphql-tag');
const {Category} = require('../../shared/typedefs');

module.exports = gql`
  ${Category}
`;

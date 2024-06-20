'use strict'

const gql = require('graphql-tag');
const user = require('./user');
const createUser = require('./createUser');
const auth = require('./auth');
const recovery = require('./recovery');
const { User } = require('../../shared/typedefs');

module.exports = gql`
    ${User}
    ${user}
    ${createUser}
    ${auth}
    ${recovery}
`;

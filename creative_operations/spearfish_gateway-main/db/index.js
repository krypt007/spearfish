'use strict'
const connection = require('./connection');
const createDefaultCategories = require('./setup/createDefaultCategories');

module.exports = {
    Connection: connection,
    createDefaultCategories
}

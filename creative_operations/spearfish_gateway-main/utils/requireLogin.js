const {unAuthenticated} = require('./errorHandling');

/**
 * @method requireLogin
 * @description checks if a user is logged in and throws an error
 * @param context Graphql current context
 * returns {void}
 */
const requireLogin = (context) => {
    if (!context.auth.isLoggedIn || !context.auth.user) {
        unAuthenticated('Permission denied. Login required.');
        return;
    }
    return { user: context.auth.user };
}

module.exports = requireLogin;

const {schema, model, models} = require('mongoose');

const ID = schema.types.ObjectId;

const userChallengeObject = {
    user: {type: ID, required: true, ref: 'User'},
    challenge: {type: ID, required: true, ref: 'Challenge'},
    balance: {type: Number, required: true, default: 0}
}

const userChallengeSchema = new schema(userChallengeObject, { timestamps: true });

module.exports = models.UserChallenge || model('UserChallenge', userChallengeSchema);

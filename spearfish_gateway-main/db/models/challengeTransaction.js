const { Schema, model, models } = require('mongoose');

const ID = Schema.types.ObjectId;

const challengeTransactionObject = {
    userChallenge: { type: ID, required: true, ref: 'UserChallenge' },
    amount: { type: Number, required: true, default: 0 }
}

const challengeTransactionSchema = new Schema(challengeTransactionObject, { timestamps: true });

module.exports = models.ChallengeTransaction || model('ChallengeTransaction', challengeTransactionSchema);

const { Schema, model, models } = require('mongoose');

const challengeObj = {
    name: { type: String, required: true },
    multiplier: { type: Number, default: 1, required: true },
    durationMonths: { type: Number, default: 5, required: true },
    earlyWithdrawalPenalty: { type: Number, default: 3, required: true },
    missedPaymentPenalty: { type: Number, default: 5, required: true },
    interest: { type: Number, default: 3, required: true }
}

const challengeSchema = new Schema(challengeObj, { timestamps: true });

module.exports = models.Challenge || model('Challenge', challengeSchema);

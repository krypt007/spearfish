const { Schema, model, models } = require('mongoose');

const ID = Schema.Types.ObjectId;

const categoryObject = {
    category: { type: ID, ref: 'Category' },
    amount: { type: Number, default: 0, required: true },
    total_amount: { type: Number, default: 0, required: true }
}

const budgetObject = {
    name: { type: String, default: '', required: true },
    user: { type: ID, required: true, ref: 'User' },
    isClosed: { type: Boolean, default: false, required: true },
    amount: { type: Number, default: 0, required: true },
    savings: { type: Number, default: 0, required: true },
    categories: { type: [categoryObject], default: [], required: true }
}

const budgetSchema = new Schema(budgetObject, { timestamps: true });

budgetSchema.pre('remove', function(next) {
    // Remove all the categoryTransaction docs that reference the removed budget.
    this.model('CategoryTransaction').remove({ budget: this._id }, next);
});

module.exports = models.Budget || model('Budget', budgetSchema);

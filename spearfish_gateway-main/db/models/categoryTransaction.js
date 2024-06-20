const { Schema, model, models } = require('mongoose');

const ID = Schema.Types.ObjectId;

const categoryTransactionObject = {
    user: { type: ID, required: true, ref: 'User' },
    budget: { type: ID, required: true, ref: 'Budget' },
    category: { type: ID, required: true, ref: 'Category' },
    title: { type: String, required: true},
    description: {type: String, required: true},
    amount: { type: Number, required: true, default: 0 },
    date: { type: Date, required: true}
}

const categoryTransactionSchema = new Schema(categoryTransactionObject, { timestamps: true });

module.exports = models.CategoryTransaction || model('CategoryTransaction', categoryTransactionSchema);

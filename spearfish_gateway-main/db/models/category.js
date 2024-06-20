const { Schema, models, model } = require('mongoose');

const ID = Schema.Types.ObjectId;

const categoryObject = {
    name: { type: String, required: true, unique: true },
    img: { type: String, required: true, default: '' },
    icon: { type: String, required: true, default: '' },
    description: { type: String, required: true, default: '' },
    owner: { type: ID, ref: 'User', default: null }
}

const categorySchema = new Schema(categoryObject, { timestamps: true });

categorySchema.pre('remove', function(next) {
    // Remove all the categoryTransaction docs that reference the removed budget.
    this.model('CategoryTransaction').remove({ budget: this._id }, next);
});

module.exports = models.Category || model('Category', categorySchema);

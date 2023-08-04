const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
{
    name: {type: String, trim: true, minLength: 3, maxLength: 30, required: true, unique: true}
}, 
{
    timestamps: true
});

module.exports = mongoose.model("Category", categorySchema);

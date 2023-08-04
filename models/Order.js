const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const cartItem = mongoose.Schema(
{
    product: {type: ObjectId, ref: "Product"},
    name: {type: String},
    price: {type: Number},
    count: {type: Number}
}, 
{
    timestamps: true
});

const orderSchema = mongoose.Schema(
{
    products: [cartItem],
    transaction_id: {type: String, default: "quuux"},
    amount: {type: Number, default: 100},
    address: {type: String},
    status: {type: String, default: "Not Processed", enum: ["Not Processed", "Processed", "Shipped", "Cancelled"]},
    updated: {type: Date},
    user: {type: ObjectId, ref: "User"}
},
{
    timestamps: true 
});

module.exports = mongoose.model("Order", orderSchema);

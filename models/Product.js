const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const productSchema = mongoose.Schema({
    name: {type: String, minLength: 2, maxLength: 200 , trim: true, unique: true, required: true},
    description: {type: String, trim: true, required: true},
    category: {type: ObjectId, ref: 'Category', required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    sold: {type: Number, default: 0},
    shipping: {type: Boolean, default: false},
    photo1: {data: Buffer, contentType: String},
    photo2: {data: Buffer, contentType: String},
    photo3: {data: Buffer, contentType: String},
    photo4: {data: Buffer, contentType: String},
    photo5: {data: Buffer, contentType: String}
}, {timestamps: true}) 


module.exports = mongoose.model('Product', productSchema);

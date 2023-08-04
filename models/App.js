const mongoose = require("mongoose");

const appSchema = mongoose.Schema(
{
    logo: {data: Buffer, contentType: String}
},
{
    timestamps: true
});

module.exports = mongoose.model("App", appSchema);

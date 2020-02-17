//Required Imports
var mongoose = require("mongoose");

//Currently only allow one selection as response
var pollSchema = mongoose.Schema({
    pollId: String,
    title: String,
    userId: String, //userId is email for now
    selections: [{
        selectNum: Number,
        selectString: String, 
    }],
    responses:[{
        ip: String,
        selection: Number,
        responseTime: String,
    }],
    createDate: String
})

//Export Schema as Model
module.exports = mongoose.model("Poll",pollSchema);
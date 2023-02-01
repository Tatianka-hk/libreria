const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bookSchema =  new Schema({ 
    name:{
        type:String,
    },
    author:{
        type:String,
    },
    genre:{
        type:String,
    },
    short_description:{
        type:String,
    },
    long_description:{
        type:String,
    }
})

const Book = mongoose.model('Book',bookSchema);
module.exports = Book;
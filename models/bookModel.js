var mongoose = require("mongoose")

//toggle schema
var booksSchema = new mongoose.Schema({ //variable reference to a mongodb schema
    title: String,
    author: String,
    imageUrl: String,
    desc: String,
    isbn: Number
})

module.exports = mongoose.model('Book', booksSchema) //a model is an instance of a schema
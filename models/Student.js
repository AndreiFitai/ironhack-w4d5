const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema(
    {
        name: String,
        books: [
            { type: Schema.Types.ObjectId, ref: 'Book' },
        ],
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

const Book = mongoose.model('Student', studentSchema)

module.exports = Book

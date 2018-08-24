const express = require('express')
const router = express.Router()
const Book = require('../models/Book')

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index')
})

router.get('/book-list', (req, res, next) => {
    Book.find({})
        .then(books => {
            res.render('book-list', { books })
        })
        .catch(console.error)
})

router.get('/book/:id', (req, res, next) => {
    Book.findById(req.params.id)
        .then(book => {
            res.render('book-details', { book })
        })
        .catch(console.error)
})

module.exports = router

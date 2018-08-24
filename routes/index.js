const express = require('express')
const router = express.Router()
const Book = require('../models/Book')
const Student = require('../models/Student')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/book-list', (req, res) => {
    Book.find({})
        .then(books => {
            res.render('book-list', { books })
        })
        .catch(console.error)
})

router.get('/book/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(book => {
            res.render('book-details', { book })
        })
        .catch(console.error)
})

router.get('/book/delete/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id)
        .then(result => {
            res.redirect('/book-list')
        })
        .catch(console.error)
})

router.get('/create-book', (req, res) => {
    res.render('create-book')
})

router.post('/create-book', (req, res) => {
    const {
        title, author, rating, description,
    } = req.body

    new Book({
        title,
        author,
        rating,
        description,
    })
        .save()
        .then(book => {
            res.render('book-details', { book, new: true })
        })
})

router.get('/update-book/:id', (req, res) => {
    const { id } = req.params
    Book.findById(id).then(book => {
        res.render('update-book', { book })
    })
})

router.post('/update-book/:id', (req, res) => {
    const { id } = req.params

    const {
        title, author, rating, description,
    } = req.body

    Book.findByIdAndUpdate(
        id,
        {
            title,
            author,
            rating,
            description,
        },
        { new: true }
    ).then(book => {
        res.render('book-details', { book, updated: true })
    })
})

router.get('/student/list', (req, res) => {
    Student.find({}).then(students => {
        res.render('students', { students })
    })
})

router.get('/student/details/:id', (req, res) => {
    Student.findById(req.params.id)
        .populate('books')
        .then(student => {
            res.render('student-details', { student })
        })
        .catch(console.error)
})

module.exports = router

const express = require('express');
const Article = require('../models/Article');

const router = new express.Router();


router.get('/', (req,res) => {
    // the same parameters may be passed as body from some input field on the front end
    let {sortBy, title} = req.query;
    let date = Date.parse(req.query.date);
    const allowedQueries = ['date', 'title'];
    let query = Article.find();

    if (title) {
        // finds titles that start with the search term
        // query = query.find({ 'title': { '$regex' : '^'+title+'.+' , '$options' : 'i' } });
        // finds titles that include the search term
        query = query.find({ 'title': { '$regex' : title , '$options' : 'i' } });
    }
    // correct input check
    if (!isNaN(date)) {
        // finds articles from start of the given date day till the end down to the last millisecond
        query = query.find({ date: { $gte: date, $lte: new Date(date + 1*24*60*60*999) }});
    }

    if (sortBy) {
        // filtering queries for wrong user input
        sortBy = [...sortBy.split(',').filter(q => allowedQueries.includes(q))];        
        // make a query for sorting
        return query
        .sort([[sortBy[0], sortBy[0] === 'title'? 1 : -1], [sortBy[1], sortBy[1] === 'date' ? -1 : 1]])
        .then(articles => res.status(200).json(articles));

    } else {
       return query.then(articles => res.status(200).json(articles));
    }
})

router.post('/', (req, res) => {
    const body = req.body;
    // if all request bodies are valid and user doesn't send wrong input
    Article.create(body)    
    .then(article => res.status(200).json(article))
    .catch((error) => res.status(400).json(error.message));
})

router.patch('/:id', (req, res) => {
    const body = req.body;
    Article.findOneAndUpdate( {_id: req.params.id}, body)
    .then(updated => res.status(200).json({ message: 'Article updated', article: updated }))
    .catch(error => res.status(400).json(error.message));
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Article.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: 'Articled deleted successfully!' }))
    .catch((error) => res.status(400).json({ message: error.message }));
})


module.exports = router;
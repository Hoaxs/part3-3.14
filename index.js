const express = require('express');
const app = express();
app.use(express.static('build'))
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/person')
app.use(cors());

app.use(express.json());

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined) {

        return response.status(400).json({ error: 'content missing' })

    }
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.get('/api/persons', (request, response) => {

    Person.find({}).then(person => {
        response.json(person)
    })
})


// use Mongoose findById method
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })

})


const PORT = process.env.PORT
app.listen(PORT, () => { console.log(`Running on port ${PORT}`) })
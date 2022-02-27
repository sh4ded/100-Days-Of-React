const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', (req, res) => {
	return JSON.stringify(req.body)
})

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())

app.use(requestLogger)

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens.body(req, res),
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

const d = new Date()
const n = persons.length

app.get('/info', (request, response) => {
	response.send(
		`<p>Phonebook has info for ${n} people</p>
		<p>${d}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)
	if (!person)
	{
		response.statusMessage = ("Entry not found")
		response.status(404).end()
	}
	else {
		response.json(person)
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)
	response.status(204).end()
})

app.post('/api/persons', (request, response) => {
	const person = request.body

	if (!person.name)
	{
		return response.status(400).json({
			error: 'name not entered'})
	}
	else if (!person.number)
	{
		return response.status(400).json({
			error: 'number not entered'})
	}
	else if (persons.find(p => p.name === person.name))
	{
		return response.status(409).json({
			error: 'name already exists'
		})
	}
	
		const newPerson = {
			id: Math.floor(Math.random() * 10000000000),
			name: person.name,
			number: person.number
		}
		persons = persons.concat(newPerson)
		response.json(persons)
	
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({
		error: 'No endpoint found'
	})
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
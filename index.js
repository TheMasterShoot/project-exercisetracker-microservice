const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

// ----- En memoria -----
let users = []
let exercises = []

// ----- Crear nuevo usuario -----
app.post('/api/users', (req, res) => {
  const username = req.body.username
  const _id = Date.now().toString(36) + Math.random().toString(36).substring(2)
  const newUser = { username, _id }
  users.push(newUser)
  res.json(newUser)
})

// ----- Obtener todos los usuarios -----
app.get('/api/users', (req, res) => {
  res.json(users)
})

// ----- Agregar ejercicio -----
app.post('/api/users/:_id/exercises', (req, res) => {
  const { description, duration, date } = req.body
  const user = users.find(u => u._id === req.params._id)

  if (!user) return res.status(404).send('User not found')

  const exerciseDate = date ? new Date(date) : new Date()
  const formattedDate = exerciseDate.toDateString()

  const exercise = {
    _id: user._id,
    username: user.username,
    description,
    duration: parseInt(duration),
    date: formattedDate
  }

  exercises.push({ ...exercise })

  res.json(exercise)
})

// ----- Obtener log de ejercicios -----
app.get('/api/users/:_id/logs', (req, res) => {
  const user = users.find(u => u._id === req.params._id)
  if (!user) return res.status(404).send('User not found')

  let userLogs = exercises.filter(e => e._id === user._id)

  // Filtros opcionales
  const { from, to, limit } = req.query

  if (from) {
    const fromDate = new Date(from)
    userLogs = userLogs.filter(e => new Date(e.date) >= fromDate)
  }

  if (to) {
    const toDate = new Date(to)
    userLogs = userLogs.filter(e => new Date(e.date) <= toDate)
  }

  if (limit) {
    userLogs = userLogs.slice(0, parseInt(limit))
  }

  res.json({
    username: user.username,
    count: userLogs.length,
    _id: user._id,
    log: userLogs.map(e => ({
      description: e.description,
      duration: e.duration,
      date: e.date
    }))
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

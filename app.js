const express = require('express')
const mongoose = require('mongoose')
const mongoURI = require('./config/db')

const app = express()

// middleware
app.use(express.static('public'))
app.use(express.json())

// view engine
app.set('view engine', 'ejs')

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then((res) => console.log(`MongoDB Connected`))
    .catch((error) => console.error(error))

const PORT = process.env.PORT || 5000

// routes
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', (req, res) => res.render('smoothies'))

app.use('/auth', require('./routes/authRoutes'))

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))

require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const connectDB = require('./config/db')
const jobRoutes = require('./routes/jobRoutes')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')


const app = express()

connectDB()

// middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))         // form verisini alabilmek icin
app.use(express.json())
app.use(methodOverride('_method'))
app.use(cookieParser())                         // req.cookies için

// static
app.use(express.static('public'))

const PORT = 3000

app.set("view engine", "ejs");


app.use('/auth', authRoutes)     // "/auth" ile başlayan bütün istekleri authRoutes dosyasına yönlendir
app.use('/', jobRoutes)             // "/" ile başlayan bütün istekleri jobRoutes dosyasına yönlendir



app.listen(PORT, () => {
    console.log("Server ayaga kalkti")
})
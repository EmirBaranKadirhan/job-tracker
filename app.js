require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const connectDB = require('./config/db')
const jobRoutes = require('./routes/jobRoutes')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')


const app = express()



// middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))         // form verisini alabilmek icin
app.use(express.json())
app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body._method === 'string') {
        return req.body._method;
    }
}));
app.use(cookieParser())                         // req.cookies için

// static
app.use(express.static('public'))

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");


app.use('/auth', authRoutes)     // "/auth" ile başlayan bütün istekleri authRoutes dosyasına yönlendir
app.use('/', jobRoutes)             // "/" ile başlayan bütün istekleri jobRoutes dosyasına yönlendir



const start = async () => {
    try {
        await connectDB();  // burada hata atarsa aşağıdaki listen çalışmaz
        app.listen(PORT, () => {
            console.log(`Server ayaga kalkti - ${PORT}`);
        });
    } catch (err) {
        console.error('DB bağlantısı başarısız, uygulama başlatılmadı.', err);
        process.exit(1);    // deploy'un "failed" olarak görünmesini sağlar
    }
};

start();
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const cool = require('cool-ascii-faces')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const healthArticlesRoutes = require('./src/routes/healtharticles')
const testimonialRoutes = require('./src/routes/testimonial')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, 'rumah-sakit' + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const image = 'image1' || 'image2' || 'image3' || 'image4' || 'image5'

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single(image))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

app.use('/health-articles', healthArticlesRoutes)
app.use('/testimonial', testimonialRoutes)

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
})

const PORT = 6200

mongoose.connect('mongodb+srv://ridwan:ugELM2oeKdlMmVR9@cluster0.mtciq.mongodb.net/rumahsakit?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // app.use(express.static(path.join(__dirname, 'public')))
        // app.set('views', path.join(__dirname, 'views'))
        // app.set('view engine', 'ejs')
        // app.get('/', (req, res) => res.render('pages/index'))
        // app.get('/cool', (req, res) => res.send(cool()))
        app.listen(PORT, () => console.log(`Server connect on ${PORT}`))
    })
    .catch((err) => console.log(err))


const express = require('express')

const router = express.Router();

const testimonialControllers = require('../controllers/testimonial')

router.post('/post', testimonialControllers.post)

module.exports = router;
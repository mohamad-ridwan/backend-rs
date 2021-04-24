const testimonial = require('../models/testimonial')

// post
exports.post = (req, res, next) => {
    const name = req.body.name
    const label = req.body.label
    const image = req.body.image
    const deskripsi = req.body.deskripsi

    const post = new testimonial({
        name: name,
        label: label,
        image: image,
        deskripsi: deskripsi
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'data berhasil di tambah',
                data: result
            })
        })
        .catch(err => {
            console.log(err)
        })
}
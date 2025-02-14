import multer from "multer";
import path from 'path'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // return cb(null,"../uploads")
        return cb(null, path.join(process.cwd(), "uploads"))
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploadFileValidation = (req, file, cb) => {
    const allowedOnly = ['image/jpeg', 'image/png', 'image/jpg']
    if (allowedOnly.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(new Error('Only JPEG, PNG, and JPG files are allowed'), false)
    }
}


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // limit to 5MBonly
    },
    fileFilter: uploadFileValidation,
})

export const uploadImage = (fieldName) => (req, res, next) => {

    const uploadSingle = upload.single(fieldName)

    uploadSingle(req, res, (err) => {
        if (err) {
            console.log("Error while saving the image")
            return res.status(400).json({ message: 'Error while saving the image', errror: err.message })
        }
        console.log(`Image save successfully... `)
        next()
    })

}


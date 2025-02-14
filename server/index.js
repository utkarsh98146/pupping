
import express from 'express'
import multer from 'multer'
import path from 'path'
const app = express()
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.urlencoded({ extended: true }));

const PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads',express.static('uploads'))
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*---*-*-*-
// const upload=multer({dest:'uploads/'})

// app.post('/profile-image',upload.single("profile-image"),(req,res)=>{
//     console.log("Request receive for upload")
//     console.log(req.body)
//     console.log(req.file)
//     if (!req.file) {
//         return res.status(400).send('No file uploaded!');
//     }

//     return res.send("Uploaded successfully.  ")
// })

//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*---*-*-*-

// OR


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

app.post('/profile-image',upload.single('profile-image'),function(req,res,next){
    console.log("Saving your image..")
  console.log(req.file,req.body)
  console.log("Image saved successfully")
})

app.listen(PORT, (err) => {
    console.log(`Server start at the ${PORT}`)
})

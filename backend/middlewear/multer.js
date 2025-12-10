import multer from 'multer'
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.join("public")
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder)
        }
        cb(null, folder)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })
export default upload

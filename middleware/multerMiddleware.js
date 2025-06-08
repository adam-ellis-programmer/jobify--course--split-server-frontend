import multer from 'multer'
import DataParser from 'datauri/parser.js'
import path from 'path'

// ********* leave in for reference *********
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads')
//   },

//   filename: (req, file, cb) => {
//     const fileName = file.originalname

//     cb(null, fileName)
//   },
// })
// const upload = multer({ storage })

const storage = multer.memoryStorage()
const upload = multer({ storage })

const parser = new DataParser()

// export helper file
export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString()
  return parser.format(fileExtension, file.buffer).content
}

// one default per file
export default upload

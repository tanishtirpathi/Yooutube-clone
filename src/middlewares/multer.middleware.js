import mutter from "mutter" ;
const storage = multer.diskStorage({
    destinetion: function (req, file, cb) {
       cb(null,"/public/temp" )
    },
    filename: function (req, file, cb) {
    cb(null, file.originalname)}})

export const upload= multer({
storage,
})
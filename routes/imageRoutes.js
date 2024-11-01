const { Router } = require("express")
const router = Router()
const multer = require("multer")
const {uploadImage,GetFormPage,} = require("../controller/detail")
const { storage } = require("../cloud.config")
const upload = multer(storage).single("imageUrl");

router.get('/', GetFormPage)

router.post('/',upload, uploadImage);

module.exports = router
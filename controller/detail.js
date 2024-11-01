const Model = require("../model/images")
const path = require("path")
const multer = require("multer")
const cloudinary = require('cloudinary').v2;
const fs = require("fs")

const Imagedir = path.join(__dirname, "upload")
if (!fs.existsSync(Imagedir)) {
    fs.mkdirSync(Imagedir);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(Imagedir))
    },
    filename: function (req, file, cb) {
        const data = Date.now() + "-" + Math.round(Math.random() * 10000000000)
        cb(null, file.originalname + "-" + data)
    }
})
// const upload = multer({storage:storage})


async function GetFormPage(req, res) {
    return res.render("home")
}

async function uploadImage(req, res) {
    try {
        console.log("function is calling")
        const { title, description } = req.body
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "Cloudinary-Rehan-Data",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(req.file.buffer); 
        });
        const formdata = await Model.create({
            title,
            description,
            imageUrl:result.secure_url
        })
        const plainFormdata = formdata.toObject();

        console.log(formdata)
        return res.status(200).json({
            message: "Form data saved successfully",
            formdata: plainFormdata,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error });
    }
}


module.exports = { GetFormPage, uploadImage, storage }
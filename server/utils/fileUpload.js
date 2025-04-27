const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        const rootdir = path.dirname(require.main.filename);
        cb(null,"uploads/")
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now() + "-" + file.originalname)
    }
}) 

const fileFilter = (req,file,cb)=>{
    console.log(file.mimetype)
    if (
        file.mimetype === "application/octet-stream" ||
        file.mimetype === "model/gltf-binary" ||
        file.mimetype === "model/gltf+json"
      ){
        cb(null,true)
    }else{
        cb(new Error("Invalid file type, only glb and gltf are allowed"),false)
    }

}

exports.fileUpload = multer({storage, fileFilter})


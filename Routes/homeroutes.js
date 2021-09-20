const express = require("express");
const router = express.Router();
const PlayerController =  require("../Controllers/PlayerController");
const multer = require("multer");
const path = require("path");
const videoStorage = multer.diskStorage({
    destination: '../videos', // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
         + path.extname(file.originalname))
    }
});
const videoUpload = multer({
    storage: videoStorage,
    limits: {
    fileSize: 100000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      // upload only mp4 and mkv format
      if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
         return cb(new Error('Please upload a video'))
      }
      cb(undefined, true)
   }
})


router.get("/" , PlayerController.getVideosList);

router.get("/play" , PlayerController.playVideo);

router.get('/video' , PlayerController.streamVideo);

router.get("/upload_video" , PlayerController.getUploadVideo);

router.post("/upload_video" ,videoUpload.single('video') ,PlayerController.postUploadVideo);


module.exports = router;
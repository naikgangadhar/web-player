const express = require("express");
const router = express.Router();
const PlayerController =  require("../Controllers/PlayerController");


router.get("/" , PlayerController.getVideosList);

router.get("/play" , PlayerController.playVideo);

router.get('/video' , PlayerController.streamVideo);

router.get("/upload_video" , PlayerController.getUploadVideo);

router.post("/upload_video" , PlayerController.postUploadVideo);


module.exports = router;
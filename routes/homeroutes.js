const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/" , function(req , res){
    fs.readdir('videos' , function(err , files){
        if(err)
            return console.log('Unable to scan directory: ' + err);
        res.render('videos' , {files});
    })

});

router.get("/play/:file" , function(req , res){
    
    res.render('player' , {file : req.params.file});
    
});

router.get("/videos" , function(req , res){

    fs.readdir('videos' , function(err , files){
        if(err) return console.log('Unable to scan directory: ' + err);

        res.render('videos' , {files});
    })
    
});


router.get('/video/:file' , function(req , res){

    const range = req.headers.range; // bytes=32324-
    if(! range) res.status(400).send('range required in header');
    
    const videopath = `videos/${req.params.file}`;
    const videoSize = fs.statSync(videopath).size;
    const start = Number(range.replace(/\D/g , ""));
    const CHUNK_SIZE = 10 ** 6;
    const end = Math.min(start + CHUNK_SIZE , videoSize-1);
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start +1,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206 , headers);
    const videoStream = fs.createReadStream(videopath , {start , end})
    videoStream.pipe(res);

});

module.exports = router;
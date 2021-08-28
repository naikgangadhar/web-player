const VideosRepository = require("../Repositories/VideosRepository");
const fs = require("fs");

module.exports  =  {

    getVideosList : async function(req , res){
        let VideoMetadata = new  VideosRepository();
        let videos = await VideoMetadata.getAll();
        res.render('videos' , {videos});
    },

    playVideo : async function(req , res){
    
        res.render('player' , {video : req.query.video , type :  req.query.type });
        
    },

    streamVideo : async function(req , res){

        const range = req.headers.range; // bytes=32324-
        if(! range) res.status(400).send('range required in header');
        
        const videopath = `${req.query.video}`;
        const videoSize = fs.statSync(videopath).size;
        const start = Number(range.replace(/\D/g , ""));
        const CHUNK_SIZE = 10 ** 6;
        const end = Math.min(start + CHUNK_SIZE , videoSize-1);
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": end - start +1,
            "Content-Type": `${req.query.type}`
        }
        res.writeHead(206 , headers);
        const videoStream = fs.createReadStream(videopath , {start , end})
        videoStream.pipe(res);
    
    },
    
    getUploadVideo : async function(req , res){
        res.render('upload');
    },

    postUploadVideo : async function(req , res){

        VideoMetadata.create({ name: 'Chandan with dog', path: 'videos/VID_20161116_164505.mp4' , type :'video/mp4' })
        .then(video => {
          console.log(user.get({
            plain: true
          }))
          console.log(created)
      }) 
    }

}
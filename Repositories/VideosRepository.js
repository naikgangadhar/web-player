const  {VideoMetadata}  = require("../Models/Models");
const repository = require("../AbstractClasses/repository");

module.exports  = class VideosRepository extends repository {

    constructor() {
      super(VideoMetadata); 
    }
}

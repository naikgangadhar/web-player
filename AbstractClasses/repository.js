
module.exports  = class repository {

    constructor(model){
        this.model = model;
    }

    async getAll(){

        return  await this.model.findAll({});

    }
}
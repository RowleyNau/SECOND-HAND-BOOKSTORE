const {Photobooksforreception} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid')
const path = require('path')


class photoBooksForReceptionControllers {
    async create(req, res, next) {
        try{
            const {IdReceptionOfBooks}= req.body
            const {Photo} = req.files
            let fileName = uuid.v4 + ".jpg"
            Photo.mv(path.resolve(__dirname, '..', 'static', fileName))
            const photoBooksReception = await Photobooksforreception.create({IdReceptionOfBooks, Photo: fileName})
            return res.json(photoBooksReception)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }


    }
    async getAll(req, res) {
        // const reception = 
        let photoBooksReception;
        photoBooksReception = await Photobooksforreception.findAndCountAll()
        return res.json(photoBooksReception)
    }
    async getOne(req, res) {
        // res.json({message:'aaaa'})
        const {IdPhotoBooksForReception} = req.params
        const photoBooksReception = await Photobooksforreception.findOne(
           {where: {IdPhotoBooksForReception},
            include: [{model: photoBooksReceptionInfo, as: 'info'}]
        }, 
        )
        return res.json(photoBooksReception)
    }
}
module.exports = new photoBooksForReceptionControllers()
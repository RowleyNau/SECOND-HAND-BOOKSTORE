const {Receptionofbooks} = require('../models/models');
const ApiError = require('../error/ApiError');
const path = require('path')
// const pg = require('pg');


class receptionOfBooksControllers {
    async create(req, res, next) {
        try{
        const {IdClients, Comment, Safety, TransportAssistance, RequestDate}= req.body
        const reception = await Receptionofbooks.create({IdClients, Comment, Safety, TransportAssistance, RequestDate})
        return res.json(reception)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        const reception = await Receptionofbooks.findAll()
        return res.json(reception)
    }
    async getOne(req, res) {
        const {IdReceptionOfBooks} = req.params
        // res.json({message:'aaaa'})
    }
}
module.exports = new receptionOfBooksControllers()
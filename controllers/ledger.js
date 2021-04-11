const Ledger = require('./../models/Ledger');
const Categories = require('./../models/Categories');
const User = require('../models/User');

module.exports.addTransaction = (req, res) => {

    const { name, type, amount, description} = req.body;
    
    
    
    Categories.find( {name, user: req.decodedToken.id} )
    .then( result => {
        if(!result) res.send({err: 'no categories found'});
        
        const newResult = {result}.result[0]._id;
        
        let data = {
            name,
            type,
            amount,
            description,
            user: req.decodedToken.id,
            category: newResult
        }
        
        Ledger.create(data)
        .then( result => {
            User.findByIdAndUpdate(req.decodedToken.id, {$push: {ledger: result.__id}})
            res.send({data:result})
        })
        .catch( err => res.send(err))

    })
    
    

}

module.exports.getAll = (req, res) => {
    Ledger.find()
    .then(result => {
        res.send(result)})
    .catch( err => res.send({err}))
}
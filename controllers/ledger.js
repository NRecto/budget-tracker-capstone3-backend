const Ledger = require('./../models/Ledger');
const Categories = require('./../models/Categories');

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
        .then( result => res.send({data:result}))
        .catch( err => res.send(err))

    })
    
    

}

module.exports.getAll = (req, res) => {
    Ledger.find()
    .then(result => {
        console.log(result)
        res.json({data:result})})
    .catch( err => res.send({err}))
}
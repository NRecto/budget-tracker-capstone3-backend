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
            User.findByIdAndUpdate(req.decodedToken.id, {$push: { records: [{ledger: result.__id}]}} )
            .then( () => {
                Ledger.find({user: req.decodedToken.id})
                .then( result => {

                    totalIncome = 0;
                    totalExpense = 0;
                    let total= 0;

                    const userIncome = result.filter( data => data.type === "Income");
                    const userExpense = result.filter( data => data.type === "Expense");
                    userIncome.forEach(data => {
                        return totalIncome += parseInt(data.amount)
                    })
                    userExpense.forEach(data => {
                        return totalExpense += parseInt(data.amount)
                    })
                    total = (totalIncome - totalExpense);
                    return({ total });
                })
                .then( data => {
                    User.findByIdAndUpdate(req.decodedToken.id, { savings: data.total}, {new: true} )
                    .then( result => res.send(result))
                    .catch( err => err.message)
                })
                .catch( err => err.message)
            })
            .catch( err => err.message)
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
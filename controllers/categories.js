const Categories = require('./../models/Categories')
const User = require('./../models/User')

module.exports.addTransaction = (req, res) => {

        let data = {
			name: req.body.name,
			type: req.body.type,
			user: req.decodedToken.id
			}

        
        Categories.create(data)
        .then( result => {
            if(!result) res.send({err: "error on adding"});
            res.send({data:result})
        })
        .catch( err => res.send(err))
    
}

module.exports.getAll = ( req, res) => {

    // THIS WILL SHOW ALL CATEGORIES
    
    Categories.find()
    .then(result => res.send(result))
    .catch(err => res.send(err.message))
    
    // THIS HAS VALIDATION THAT WILL SHOW ON THE CATEGORIES MADE BY THE USER
    // Categories.find({user: req.decodedToken.id})
    // .then(result => {res.send(result)})
    // .catch(err > res.send(err.message))
}

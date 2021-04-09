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
            res.send({data:result})
        })
        .catch( err => res.send(err))
    
}

module.exports.getAll = ( req, res) => {
    Categories.find({user: req.decodedToken.id})
    .then(result => {res.send(result)})
}

const Categories = require('./../models/Categories')
const User = require('./../models/User')

module.exports.addTransaction = (req, res) => {
         let nameLowerCase = req.body.name.toLowerCase();
         
        let data = {
			name: nameLowerCase,
			type: req.body.type,
			user: req.decodedToken.id
			}


        Categories.find({name: nameLowerCase, user: req.decodedToken.id, type: req.body.type})
        .then( result => {
            // console.log(result)
            // console.log(req.decodedToken.id)
            if( result.length > 0){
                res.send({err: 'name-already-exist'})
            } else {
                Categories.create(data)
                .then( result => {
                    console.log(result._id)
                    User.findByIdAndUpdate(req.decodedToken.id, {$push: { categories: [{category: result._id}] }}, {new:true} ).then(() => true)
                    
                    res.send({data:result})
                })
                .catch( err => res.send(err))
            }
        })
        
        
    
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

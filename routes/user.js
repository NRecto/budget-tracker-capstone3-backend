const router = require('express').Router();
const UserController = require('./../controllers/user');
const auth = require('./../auth');

router.post('/email-exists', UserController.emailExists)

router.post('/', UserController.register)


router.post('/login', UserController.login)


router.get('/details', auth.verify ,UserController.details)
// (req,res) =>{

// 	(req.decodedToken.id).then(result => res.send(result))
// })


router.post('/verify-google-id-token', async (req, res) => {
	res.send( await UserController.verifyGoogleTokenId(req.body.tokenId))
})

module.exports = router;
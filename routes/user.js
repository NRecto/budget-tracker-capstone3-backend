const router = require('express').Router();
const UserController = require('./../controllers/user');
const auth = require('./../auth');

router.post('/email-exists', UserController.emailExists)

router.post('/', UserController.register)


router.post('/login', UserController.login)


router.get('/details', auth.verify ,UserController.details)

router.get('/details-landing', UserController.userLanding)

router.post('/verify-google-id-token', async (req, res) => {
	res.send( await UserController.verifyGoogleTokenId(req.body.tokenId))
})

router.post('/update-savings', auth.verify, UserController.updateSavings)
module.exports = router;
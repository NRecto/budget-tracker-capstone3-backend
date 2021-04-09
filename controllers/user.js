const User = require('./../models/User');
// const Course = require('./../models/Course');
const bcrypt = require('bcrypt');
const auth = require('./../auth');
const {OAuth2Client} =require('google-auth-library');

const clientId= '430272439226-6evoa7j40inti7gc8o80dn1mg59urgd3.apps.googleusercontent.com';

// Check for duplicate emails
module.exports.emailExists = (req, res) => {

	return User.find({ email: req.body.email }).then(result => {
		return result.length > 0 ? true : false;
	})

}

module.exports.register = (req, res)=>{
	const { firstName, lastName, email, mobileNo, loginType} = req.body
	let data = {
		firstName,
		lastName,
		email,
		mobileNo,
		password: bcrypt.hashSync(req.body.password, 10),
		loginType
	}
	User.create(data)
	.then( result => res.send(result))
	.catch( err => err.message)
	


}

module.exports.login = (req, res) => {
	
	let { email, password } = req.body;
	
	User.findOne({email}).then( user => {

		if ( user === null ){
			res.send({error: 'does-not-exist'})
		}
		if (user.loginType !== 'email'){
			res.send({error: 'login-type-error'})
		}
		
		let isPasswordMatched = bcrypt.compareSync(password,user.password);
		if (!isPasswordMatched) {
			res.send({ error: 'incorrect-password'})
		}
		
		
		let accessToken = auth.createAccessToken(user)

		res.send( {
			accessToken : accessToken
		})

	})
}

module.exports.details = (req, res) =>{
	User.findById(req.decodedToken.id, { password: 0 }).then( user => res.send(user))
}


// Google Login (Token Verification)
module.exports.verifyGoogleTokenId = async (tokenId) => {
	
	const client = new OAuth2Client(clientId);
	const data = await client.verifyIdToken({
		idToken: tokenId,
		audience: clientId
	});
	
	if (data.payload.email_verified === true) {
		const user = await User.findOne({ email: data.payload.email })
		console.log(user)
		if( user !== null ) {
			if ( user.loginType === 'google'){
				return { accessToken: auth.createAccessToken(user.toObject())}
			} else {
				return { error: 'login-type-error' }
			}
		} else {
			const newUser = new User({
				firstName: data.payload.given_name,
				lastName: data.payload.family_name,
				email: data.payload.email,
				loginType: 'google'
			})
			return newUser.save().then((user,err) => {
				return {accessToken: auth.createAccessToken(user.toObject()) };
			})
		}
	} else {
		return { error : 'google-auth-error'}
	}
}
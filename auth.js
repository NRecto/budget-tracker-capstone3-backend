const jwt = require('jsonwebtoken');


module.exports.createAccessToken = (user) =>{
	let accessToken = jwt.sign({
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}, process.env.SECRET);
	
	return accessToken;
}

module.exports.verify = (req,res,next) =>{
	let token = req.headers.authorization;
	// "Bearer ey5gfXt2"
	if( typeof token !== 'undefined'){
		token = token.slice(7, token.length);

		jwt.verify(token, process.env.SECRET, (err, decoded)=>{
			if (!err) req.decodedToken = decoded;
			return err ? res.send({auth:failed}) : next();
		})

	} else {
		return res.send({ auth: 'failed'})
	}
}
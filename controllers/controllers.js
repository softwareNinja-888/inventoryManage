const db = require("../db/queries");

exports.home = async (req,res)=>{
	const usernames = await db.getAllUsernames();
	console.log("Usernames: ", usernames);

	res.render('index',{
		title:'Home Page',
		usernames:usernames
	})
}

// module.exports = {
// };

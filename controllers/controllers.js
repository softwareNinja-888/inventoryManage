const db = require("../db/queries");

function determineView(path){
	switch (path) {
		case '/':
			return 'index'
			break;
		case '/types':
			return 'viewCategory'
			break;
		case '/features':
			return 'viewFeatures'
			break;
		case '/rooms':
			return 'viewRooms'
			break;
		default:
			console.log('Page not added')
}

}

exports.home = async (req,res)=>{
	res.render('index',{
		title:'Home Page',
	})
}
// VIEW CONTROLLERS:
exports.viewRooms = async (req,res)=>{
	const rooms = await db.getAllRooms();
	console.log("Usernames: ", determineView(req.path));

	res.render( determineView(req.path),{
		title:'View Rooms',
	})
}

// exports.viewRooms = async (req,res)=>{
// 	const rooms = await db.getAllRooms();
// 	console.log("Usernames: ", rooms);

// 	res.render('viewRooms',{
// 		title:'View Rooms',
// 	})
// }

// exports.viewRooms = async (req,res)=>{
// 	const rooms = await db.getAllRooms();
// 	console.log("Usernames: ", rooms);

// 	res.render('viewRooms',{
// 		title:'View Rooms',
// 	})
// }


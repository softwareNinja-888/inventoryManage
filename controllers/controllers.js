const db = require("../db/queries");



exports.home = async (req,res)=>{
	res.render('index',{
		title:'Home Page',
	})
}

// VIEW CONTROLLERS:
exports.viewRooms = async (req,res)=>{
	const rooms = await db.getAllRooms();
	console.log("Usernames: ",rooms);

	res.render( 'viewRooms',{
		title:'View Rooms',
		rooms:rooms
	})
}

exports.viewCategories = async (req,res)=>{
	const categories = await db.getAllRoomTypes();

	res.render('viewCategories',{
		title:'View Categories',
		categories:categories
	})
}

exports.viewFeatures = async (req,res)=>{
	const features = await db.getAllFeatures();

	res.render('viewFeatures',{
		title:'View Features',
		features:features
	})
}


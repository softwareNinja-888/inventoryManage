const db = require("../db/queries");

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 2 and 50 characters.";


const validate = [
	body('featureName').trim()
		.isLength({ min: 2, max: 50 })
		.withMessage(`Feature name ${lengthErr}`)
		.matches(/^[\w\s\-\/&()]+$/)
		.withMessage("Feature name contains invalid characters")
		.escape(),
	// ROOM DATA:
];


const validateRoom = [
	body('roomName')
    .trim()
    .notEmpty().withMessage('Room name is required.')
    .isLength({ min: 3, max: 50 }).withMessage('Room name must be 3–50 characters.')
    .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Room name must contain only letters, numbers, and spaces.'),

	body('roomNumber')
		.notEmpty().withMessage('Room number is required.')
		.isInt({ min: 1 }).withMessage('Room number must be a positive number.'),

	body('roomType')
		.notEmpty().withMessage('Room type is required.')
		.isIn(['1', '2', '3']).withMessage('Invalid room type.'),

	body('roomStatus')
		.notEmpty().withMessage('Room status is required.')
		.isIn(['available', 'maintenance', 'booked']).withMessage('Invalid room status.'),

	body('roomFloor')
		.notEmpty().withMessage('Room floor is required.')
		.isIn(['1', '2', '3']).withMessage('Invalid room floor.'),
];
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

exports.addFeature = async (req,res)=>{
	res.render('addFeature',{
	    errors: [],
	})
}

exports.removeFeature = async (req,res)=>{
	const id = req.body.featureId;
	try {
		await db.removeFeature(id)
		res.redirect('/features');
	} catch (err) {
		console.error(err);
		res.status(500).send("Error Deleting feature.");
	}
}

// TODO: VALIDATE SO USERS CANT ADD DUPLICATE FEATURES
exports.postFeature =  [
	validate,
	async (req, res) => {
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return res.status(400).render('addFeature',{
        title: "Post Feature",
        errors: errors.array(),
        oldInput:req.body.featureName
			})
		}
	  try {
		  const featureName = req.body.featureName;
		  await db.insertFeature(featureName);
		  res.redirect('/features');
		} catch (err) {
		  console.error(err);
		  res.status(500).send("Error inserting feature.");
		}

	}
]

// ROOM FUNCTIONALITY

exports.addRoom = async (req,res)=>{
	res.render('addRoom',{
	    errors: [],
	})
}

exports.removeRoom = async (req,res)=>{
	const id = req.body.roomId;
	try {
		await db.removeFeature(id)
		res.redirect('/rooms');
	} catch (err) {
		console.error(err);
		res.status(500).send("Error Deleting room.");
	}
}

// TODO: VALIDATE SO USERS CANT ADD DUPLICATE FEATURES
exports.postRoom =  [
	validateRoom,
	async (req, res) => {
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return res.status(400).render('addRoom',{
				title: "Post Room",
				errors: errors.array(),
				oldInput:req.body
			})
		}
	  try {
		  const roomData = req.body;
		  await db.insertRoom(roomData)
		  res.redirect('/rooms');
		} catch (err) {
		  console.error(err);
		  res.status(500).send("Error inserting room.");
		}

	}
]


// CATEGORY FUNCTIONALITY

// exports.addRoom = async (req,res)=>{
// 	res.render('addRoom',{
// 	    errors: [],
// 	})
// }

// exports.removeRoom = async (req,res)=>{
// 	const id = req.body.roomId;
// 	try {
// 		await db.removeFeature(id)
// 		res.redirect('/rooms');
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).send("Error Deleting room.");
// 	}
// }

// // TODO: VALIDATE SO USERS CANT ADD DUPLICATE FEATURES
// exports.postFeature =  [
// 	validate,
// 	async (req, res) => {
// 		const errors = validationResult(req)
// 		if(!errors.isEmpty()){
// 			return res.status(400).render('addFeature',{
//         title: "Post Feature",
//         errors: errors.array(),
//         oldInput:req.body.featureName
// 			})
// 		}
// 	  try {
// 		  const featureName = req.body.featureName;
// 		  await db.insertFeature(featureName);
// 		  res.redirect('/features');
// 		} catch (err) {
// 		  console.error(err);
// 		  res.status(500).send("Error inserting feature.");
// 		}

// 	}
// ]
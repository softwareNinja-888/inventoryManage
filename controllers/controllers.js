const db = require("../db/queries");

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 2 and 50 characters.";


const validateUser = [
	body('featureName').trim()
  .isLength({ min: 2, max: 50 })
  .withMessage(`Feature name ${lengthErr}`)
  .matches(/^[\w\s\-\/&()]+$/)
	.withMessage("Feature name contains invalid characters")
  .escape(),
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
	validateUser,
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


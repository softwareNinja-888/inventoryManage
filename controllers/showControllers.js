const { render } = require("ejs");
const db = require("../db/queries");

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 2 and 50 characters.";

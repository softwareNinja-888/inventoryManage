const pool = require("./pool");

async function getAllRooms() {
  const { rows } = await pool.query("SELECT * FROM rooms");
  return rows;
}


async function getAllRoomTypes() {
  const { rows } = await pool.query("SELECT * FROM room_types");
  console.log('Cat',rows)
  return rows;
}

async function getAllFeatures() {
  const { rows } = await pool.query("SELECT * FROM room_features");
  return rows;
}
async function insertFeature(feature) {
  await pool.query("INSERT INTO room_features (name) VALUES ($1)", [feature]);
}
async function removeFeature(featureId) {
  try {
    await pool.query("DELETE FROM room_features WHERE id = $1", [featureId]);
  } catch (err) {
    console.error("Error deleting feature:", err);
    throw err;
  }
}

async function insertRoom(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

module.exports = {
  getAllRooms,
  getAllRoomTypes,
  getAllFeatures,
  removeFeature,
  insertFeature,
  insertRoom
};

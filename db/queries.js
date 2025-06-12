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
  console.log('Feat',rows)

  // const { rows } = await pool.query("SELECT * FROM room_feature_assignments");

  return rows;
}

async function insertRoom(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

module.exports = {
  getAllRooms,
  getAllRoomTypes,
  getAllFeatures,
  insertRoom
};

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
  try {
    await pool.query("INSERT INTO room_features (name) VALUES ($1)", [feature]);
  } catch (err) {
    console.error("Error inserting feature:", err);
    throw err;
  }
}
async function removeFeature(featureId) {
  try {
    await pool.query("DELETE FROM room_features WHERE id = $1", [featureId]);
  } catch (err) {
    console.error("Error deleting feature:", err);
    throw err;
  }
}

async function insertRoom(roomData) {
    try {
      await pool.query("INSERT INTO rooms (room_number,name,status,room_type_id,floor) VALUES ($1,$2,$3,$4,$5)", 
        [roomData.roomNumber,roomData.roomName,roomData.roomStatus,roomData.roomtypeId,roomData.roomFloor,]);
    } catch (err) {
      console.error("Error inserting room:", err);
      throw err;
    }
}

module.exports = {
  getAllRooms,
  getAllRoomTypes,
  getAllFeatures,
  removeFeature,
  insertFeature,
  insertRoom
};

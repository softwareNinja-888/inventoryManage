const pool = require("./pool");

// GET
async function getRoom(id) {
  const { rows } = await pool.query("SELECT * FROM rooms WHERE id = $1",[id])
  return rows
}
async function getAllRooms() {
  const { rows } = await pool.query("SELECT * FROM rooms");
  return rows;
}
async function getAllRoomTypes() {
  const { rows } = await pool.query("SELECT * FROM room_types");
  return rows;
}
async function getAllFeatures() {
  const { rows } = await pool.query("SELECT * FROM room_features");
  return rows;
}

// INSERT 

async function insertRoom(roomData) {
  try {
    await pool.query("INSERT INTO rooms (room_number,name,status,room_type_id,floor) VALUES ($1,$2,$3,$4,$5)", 
      [roomData.roomNumber,roomData.roomName,roomData.roomStatus,roomData.roomtypeId,roomData.roomFloor,]);
  } catch (err) {
    console.error("Error inserting room:", err);
    throw err;
  }
}
async function insertFeature(feature) {
  try {
    await pool.query("INSERT INTO room_features (name) VALUES ($1)", [feature]);
  } catch (err) {
    console.error("Error inserting feature:", err);
    throw err;
  }
}
async function insertCategory(categoryData) {
  try {
    await pool.query("INSERT INTO room_types (name,description,base_price) VALUES ($1,$2,$3)", 
      [categoryData.categoryName,categoryData.categoryDescription,categoryData.basePrice]);
  } catch (err) {
    console.error("Error inserting category:", err);
    throw err;``
  }
}

// DELETE

async function removeFeature(featureId) {
  try {
    await pool.query("DELETE FROM room_features WHERE id = $1", [featureId]);
  } catch (err) {
    console.error("Error deleting feature:", err);
    throw err;
  }
}
async function removeRoom(roomId) {
  try {
    await pool.query("DELETE FROM rooms WHERE id = $1", [roomId]);
  } catch (err) {
    console.error("Error deleting room:", err);
    throw err;
  }
}
async function removeCategory(categoryId) {
  try {
    await pool.query("DELETE FROM room_types WHERE id = $1", [categoryId]);
  } catch (err) {
    console.error("Error deleting category:", err);
    throw err;
  }
}

// UPDATE
async function updateRoom(id,roomData) {
  try {
    await pool.query("UPDATE rooms SET room_number=$1, name=$2, status=$3, room_type_id=$4, floor=$5 WHERE id = $6"
    , 
      [roomData.roomNumber,roomData.roomName,roomData.roomStatus,roomData.roomtypeId,roomData.roomFloor,id]);
  } catch (err) {
    console.error("Error inserting room:", err);
    throw err;
  }
}


module.exports = {
  getRoom,
  getAllRooms,
  getAllRoomTypes,
  getAllFeatures,
  insertFeature,
  insertRoom,
  insertCategory,
  removeFeature,
  removeRoom,
  removeCategory,
  updateRoom
};

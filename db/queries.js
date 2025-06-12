const pool = require("./pool");

async function getAllRooms() {
  const { rows } = await pool.query("SELECT * FROM rooms");
  return rows;
}

async function insertRoom(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

module.exports = {
  getAllRooms,
  insertRoom
};

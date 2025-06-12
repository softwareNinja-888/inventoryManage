#! /usr/bin/env node
require("dotenv").config()
const { Client } = require("pg");

const SQL = `
-- Create room_types table
CREATE TABLE IF NOT EXISTS room_types (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  base_price DECIMAL(10, 2)
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  room_number VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(255),
  status VARCHAR(20) CHECK (status IN ('available', 'booked', 'maintenance')) DEFAULT 'available',
  room_type_id INTEGER REFERENCES room_types(id) ON DELETE SET NULL,
  floor INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some room types
INSERT INTO room_types (name, description, base_price)
VALUES
  ('Standard', 'A basic room with essential amenities.', 80.00),
  ('Deluxe', 'A spacious room with additional comforts.', 120.00),
  ('Suite', 'A premium room with luxury features.', 200.00)
ON CONFLICT (name) DO NOTHING;

-- Insert some rooms
INSERT INTO rooms (room_number, name, status, room_type_id, floor)
VALUES
  ('101', 'Standard Room 101', 'available', 1, 1),
  ('102', 'Standard Room 102', 'maintenance', 1, 1),
  ('201', 'Deluxe Room 201', 'booked', 2, 2),
  ('301', 'Suite Room 301', 'available', 3, 3)
ON CONFLICT (room_number) DO NOTHING;
`;


async function main() {
  console.log("seeding...");
  const client = new Client({
      host: process.env.HOST, 
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: process.env.SQLPORT
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

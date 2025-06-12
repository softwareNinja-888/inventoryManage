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

-- Create room_features table
CREATE TABLE IF NOT EXISTS room_features (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) UNIQUE NOT NULL
);

-- Create join table for room-feature relationships
CREATE TABLE IF NOT EXISTS room_feature_assignments (
  room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
  feature_id INTEGER REFERENCES room_features(id) ON DELETE CASCADE,
  PRIMARY KEY (room_id, feature_id)
);

-- Insert features
INSERT INTO room_features (name)
VALUES 
  ('Air Conditioning'),
  ('Wi-Fi'),
  ('TV'),
  ('Balcony'),
  ('Mini Fridge'),
  ('Coffee Maker')
ON CONFLICT (name) DO NOTHING;

-- Example feature assignments (room 101 has AC and Wi-Fi, etc.)
INSERT INTO room_feature_assignments (room_id, feature_id)
VALUES 
  (1, 1),  -- Room 101, Air Conditioning
  (1, 2),  -- Room 101, Wi-Fi
  (2, 1),  -- Room 102, Air Conditioning
  (3, 2),  -- Room 201, Wi-Fi
  (3, 3),  -- Room 201, TV
  (4, 1),  -- Room 301, Air Conditioning
  (4, 2),  -- Room 301, Wi-Fi
  (4, 3),  -- Room 301, TV
  (4, 4)   -- Room 301, Balcony
ON CONFLICT DO NOTHING;
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

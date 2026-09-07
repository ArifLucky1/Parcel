import pkg, { Client } from "pg";
const { client } = pkg;

const database = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: "PostgreSQL",
  port: process.env.DB_PORT,
});

try {
  await database.connect();
  console.log("Connected to the Database successfully");
} catch (error) {
  console.error("Database connection failed:", error);
  process.exit(1);
}

export default database;
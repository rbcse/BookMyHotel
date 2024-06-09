import pg from "pg";

// Create a database
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "bookmyhotel",
    password: "rahul",
    port: 5432
});

db.connect();

export default db;

import mysql from "mysql";
 
// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'internproject1'
});
export default db;
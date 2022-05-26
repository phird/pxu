import mysql from "mysql";
 
// create the connection to database
const db = mysql.createConnection({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b0b7de2d8031df',
  password: '2132ab2a',
  database: 'heroku_b93f784b1cb597b'
});
export default db;
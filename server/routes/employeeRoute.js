import express from 'express';
import db from "../config/database.js";

const router = express.Router();

router.get('/', (req, res)=> {

    const sqlSelect = "SELECT * FROM employee"
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    })
    
});

router.post('/', (req, res) => {
    const role = req.body.role
    const employeeName = req.body.employeeName
    const employeeNumber = req.body.employeeNumber
    const employeeEmail = req.body.employeeEmail


    const sqlInsert = "INSERT INTO employee (role,employeeName,employeeNumber,employeeEmail) VALUES (?,?,?,?);"
    db.query(sqlInsert, [role,employeeName,employeeNumber,employeeEmail], (err,result)=>{
        console.log(err);
        console.log(result);
        res.send(result);
    }) 
});

export default router;
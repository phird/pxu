import express from 'express';
import db from "../config/database.js";

const router = express.Router();

router.get('/', (req, res)=> {

    const sqlSelect = "SELECT * FROM employee order by employeeID DESC"
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    })
    
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM employee WHERE employeeID=?";
    db.query(sqlDelete, [id], (err, result) => {
        console.log(err);
    })
});



router.post('/', (req, res) => {
    const role = req.body.role
    const employeeName = req.body.employeeName
    const employeeNumber = req.body.employeeNumber
    const employeeEmail = req.body.employeeEmail
    const status = req.body.status

    const sqlInsert = "INSERT INTO employee (role,employeeName,employeeNumber,employeeEmail,status) VALUES (?,?,?,?,?);"
    
    if(status=='default'){
        const sqlsearch = "UPDATE employee set status='-' WHERE status='default';"
        db.query(sqlsearch, (err, research) => {
            db.query(sqlInsert, [role,employeeName,employeeNumber,employeeEmail,status], (err,result)=>{
                console.log(err);
                console.log(result);
                res.send([research,result]);
            }) 
        })
    }else{
        db.query(sqlInsert, [role,employeeName,employeeNumber,employeeEmail,status], (err,result)=>{
            console.log(err);
            console.log(result);
            res.send(result);
        }) 
    }

});


router.get('/:id', (req, res)=> {
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM employee WHERE employeeID=?"
    db.query(sqlSelect,[id], (err, result) => {
        // console.log(result);
        res.send(result);
    }) 
});

router.post('/:id', (req, res)=> {
    const empid = req.params.id;
    const employeeName = req.body.employeeName
    const employeeNumber= req.body.employeeNumber 
    const status = req.body.status
    const employeeEmail = req.body.employeeEmail
    const role = req.body.role

    const sqlupdate = "UPDATE `employee` SET `employeeName`=?,`employeeNumber`=?,`status`=?,`employeeEmail`=?,`role`=? WHERE employeeID=?"
    if(status=='default'){
        const sqlsearch = "UPDATE employee set status='-' WHERE status='default';"
        db.query(sqlsearch, (err, research) => {
            db.query(sqlupdate, [employeeName,employeeNumber,status,employeeEmail,role,empid], (err,result)=>{
                console.log(err);
                console.log(result);  
               res.send([result,research]);
           })
        })
    }else{
        db.query(sqlupdate, [employeeName,employeeNumber,status,employeeEmail,role,empid], (err,result)=>{
            console.log(err);
            console.log(result);  
           res.send(result);
       })
    }
});


export default router;
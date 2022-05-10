import express from 'express';
import db from "../../config/database.js";

const router = express.Router();

router.get('/', (req, res)=> {
    const sqlSelectem = "SELECT employeeName,employeeEmail FROM `employee` WHERE status = 'DEFAULT';"
    db.query(sqlSelectem, (err, result) => {
        // console.log(result);
        res.send(result);
    }) 
});

router.get('/bank', (req, res)=> {
    const sqlSelectbank = "SELECT bankName,img FROM `bank` WHERE status = 'DEFAULT';"
    db.query(sqlSelectbank, (err, result) => {
        // console.log(result);
        res.send(result);
    }) 
});


router.put('/', (req, res)=> {
    const sqlSelectNT = "SELECT COUNT(customerID) as c FROM customer WHERE status='นิติบุคคล';"
    const sqlSelectP = "SELECT COUNT(customerID) as c FROM customer WHERE status='บุคคลธรรมดา';"
    db.query(sqlSelectNT,(err, NT) => {
        db.query(sqlSelectP,(err, P) => {
            // console.log(NT);
            // console.log(P);
            res.send([NT,P]);
        }) 
    }) 
});


export default router;
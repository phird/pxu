import express from 'express';
import db from "../../config/database.js";

const router = express.Router();

router.get('/', (req, res)=> {
    const sqlSelectem = "SELECT employeeName,employeeEmail FROM `employee` WHERE employeestatus = 'DEFAULT';"
    db.query(sqlSelectem, (err, result) => {
        // console.log(result);
        res.send(result);
    }) 
});

router.get('/bank', (req, res)=> {
    const sqlSelectbank = "SELECT bankName,img FROM `bank` WHERE bankstatus = 'DEFAULT';"
    db.query(sqlSelectbank, (err, result) => {
        // console.log(result);
        res.send(result);
    }) 
});

router.get('/count', (req, res)=> {
    const sqlSelectcus = "SELECT COUNT(*) as ccus FROM `customer`"
    const sqlSelectquo = "SELECT COUNT(*) as cquo,SUM(paymentPrice) as p FROM `quotation` WHERE statusquotation='Contracted'"
    db.query(sqlSelectcus, (err, result1) => {
        // console.log(result);
        db.query(sqlSelectquo, (err, result2) => {
            // console.log(result);
            res.send([result1,result2]);
        }) 
    }) 
});


router.put('/', (req, res)=> {
    const sqlSelectNT = "SELECT COUNT(customerID) as c FROM customer WHERE bankstatus='นิติบุคคล';"
    const sqlSelectP = "SELECT COUNT(customerID) as c FROM customer WHERE bankstatus='บุคคลธรรมดา';"
    db.query(sqlSelectNT,(err, NT) => {
        db.query(sqlSelectP,(err, P) => {
            // console.log(NT);
            // console.log(P);
            res.send([NT,P]);
        }) 
    }) 
});


export default router;
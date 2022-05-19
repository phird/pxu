import express from 'express';
import db from "../../config/database.js";

const router = express.Router();

router.post('/', (req, res)=> {
    const month = req.body.month;
    // console.log(month);
    const sqlSelectRecent = "SELECT COUNT(customerID) as c FROM `customer` WHERE MONTH(timestramp) = ?;"
    db.query(sqlSelectRecent,[month], (err, result) => {
        // console.log(result);
        res.send(result);
    }) 
});

router.get('/', (req, res)=> {
    const sqlSelectRecent = "SELECT companyName FROM customer ORDER BY customerID DESC LIMIT 1"
    db.query(sqlSelectRecent, (err, result) => {
        // console.log(result.data);
        res.send(result);
    }) 
});

router.put('/', (req, res)=> {
    const sqlSelectNT = "SELECT COUNT(customerID) as c FROM customer WHERE customerstatus='นิติบุคคล';"
    const sqlSelectP = "SELECT COUNT(customerID) as c FROM customer WHERE customerstatus='บุคคลธรรมดา';"
    db.query(sqlSelectNT,(err, NT) => {
        db.query(sqlSelectP,(err, P) => {
            // console.log(NT);
            // console.log(P);
            res.send([NT,P]);
        }) 
    }) 
});


export default router;
import express from 'express';
import db from "../config/database.js";

const router = express.Router();

router.get('/', (req, res)=> {

    const sqlSelect = "SELECT * FROM bank"
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    })
    
});

router.post('/', (req, res) => {

    const bankName=req.body.bankName;
    const bankAccount=req.body.bankAccount;
    const accountName=req.body.accountName;
    const status=req.body.status;
    const sqlInsert = "INSERT INTO bank (bankName,bankAccount,accountName,status) VALUES (?,?,?,?);"
    db.query(sqlInsert, [bankName,bankAccount,accountName,status], (err,result)=>{
        console.log(err);
        console.log(result);
        res.send(result);
    }) 
});
export default router;
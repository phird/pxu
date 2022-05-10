import express from 'express';
import db from "../config/database.js";


const router = express.Router();


router.get('/', (req, res) => {

    const sqlSelect = "SELECT * FROM bank"
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    })

});

router.post('/', (req, res) => {
    const bankName = req.body.bankName;
    const bankAccount = req.body.bankAccount;
    const accountName = req.body.accountName;
    const status = req.body.status;
    const image = req.body.img;

    const sqlInsert = "INSERT INTO bank (bankName,bankAccount,accountName,status,img) VALUES (?,?,?,?,?);"
    if(status=='default'){
        const sqlsearch = "UPDATE bank set status='-' WHERE status='default';"
        db.query(sqlsearch, (err, research) => {
            db.query(sqlInsert, [bankName, bankAccount, accountName, status, image], (err, result) => {
                console.log(err);
                res.send([research,result]);
        })
        })
    }else{
        db.query(sqlInsert, [bankName, bankAccount, accountName, status, image], (err, result) => {
            console.log(err);
            res.send(result);
        })
    }
        
});
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM bank WHERE bankID=?";
    db.query(sqlDelete, [id], (err, result) => {
        console.log(err);
    })
});

router.get('/:id', (req, res)=> {
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM bank WHERE bankID=?"
    db.query(sqlSelect,[id], (err, result) => {
        // console.log(result);
        res.send(result);
    }) 
});


router.post('/:id', (req, res)=> {
    const bID = req.params.id;
    const bankName = req.body.bankName
    const bankAccount= req.body.bankAccount
    const status = req.body.status
    const accountName = req.body.accountName

    const sqlupdate = "UPDATE `bank` SET `bankName`=?,`bankAccount`=?,`accountName`=?,`status`=? WHERE bankID=?"
    db.query(sqlupdate, [bankName,bankAccount,accountName,status,bID], (err,result)=>{
        // console.log(err);
        // console.log(result);
        res.send(result);
    }) 
});


export default router;
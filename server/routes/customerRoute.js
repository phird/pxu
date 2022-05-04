import express from 'express';
import db from "../config/database.js";

const router = express.Router();

router.get('/', (req, res)=> {

    const sqlSelect = "SELECT * FROM customer"
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    })
    
});

router.post('/', (req, res) => {
    const companyName = req.body.companyName
    const companyNumber= req.body.companyNumber
    const status = req.body.status
    const address = req.body.address
    const subdis = req.body.subdis
    const dis = req.body.dis
    const province = req.body.province
    const postcode = req.body.postcode
    const contactName = req.body.contactName
    const contactNumber = req.body.contactNumber
    const contactEmail = req.body.contactEmail
    const taxNumber = req.body.taxNumber

    const sqlInsert = "INSERT INTO customer (companyName,companyNumber,status,address,sub-district,district,province,postcode,taxNumber,contactName,contactNumber,contactEmail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);"
    db.query(sqlInsert, [companyName,companyNumber,status,address,subdis,dis,province,postcode,taxNumber,contactName,contactNumber,contactEmail], (err,result)=>{
        // console.log(result);
        res.send(result);
    }) 
});

export default router;
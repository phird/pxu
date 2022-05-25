import express from 'express';
import db from "../config/database.js";

const router = express.Router();

router.get('/', (req, res)=> {
    const sqlSelect = "SELECT * FROM customer WHERE delstatus!='del' order by customerID DESC"
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    }) 
});

router.get('/name', (req, res)=> {
    const sqlSelect = "SELECT customerID,companyName,customerstatus FROM customer order by customerID DESC"
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

    const sqlInsert = "INSERT INTO customer (companyName,companyNumber,customerstatus,caddress,csubdistrict,cdistrict,cprovince,cpostcode,ctaxNumber,contactName,contactNumber,contactEmail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);"
    db.query(sqlInsert, [companyName,companyNumber,status,address,subdis,dis,province,postcode,taxNumber,contactName,contactNumber,contactEmail], (err,result)=>{
        // console.log(err);
        // console.log(result);
        res.send(result);
    }) 
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "UPDATE customer SET delstatus='del' WHERE customerID=?";
    db.query(sqlDelete, [id], (err, result) => {
        console.log(err);
    })
});

router.get('/:id', (req, res)=> {
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM customer WHERE customerID=?"
    db.query(sqlSelect,[id], (err, result) => {
        // console.log(result);
        res.send(result);
    }) 
});

router.post('/:id', (req, res)=> {
    const cusid = req.params.id;
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

    const sqlupdate = "UPDATE `customer` SET `companyName`=?,`companyNumber`=?,`customerstatus`=?,`caddress`=?,`csubdistrict`=?,`cdistrict`=?,`cprovince`=?,`cpostcode`=?,`ctaxNumber`=?,`contactName`=?,`contactNumber`=?,`contactEmail`=? WHERE customerID=?"
    db.query(sqlupdate, [companyName,companyNumber,status,address,subdis,dis,province,postcode,taxNumber,contactName,contactNumber,contactEmail,cusid], (err,result)=>{
        // console.log(err);
        // console.log(result);
        res.send(result);
    }) 
});


export default router;
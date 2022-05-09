import express from 'express';
import db from "../config/database.js";

const router = express.Router();

router.get('/', (req, res) => {

    const sqlSelect = "SELECT * FROM website"
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    })

});

router.post('/', (req, res) => {

    const websiteName = req.body.websiteName;
    const companyName = req.body.companyName;
    const companyNumber = req.body.companyNumber;
    const taxNumber = req.body.taxNumber;
    const address = req.body.Address;
    const subdis = req.body.subdis;
    const dis = req.body.dis;
    const province = req.body.province;
    const postcode = req.body.postcode;
    const logo = req.body.logo;
    const stamp = req.body.stamp;


    const sqlInsert = "INSERT INTO `website`(`websiteName`, `companyName`,`companyNumber`, `address`, `subdistrict`, `district`, `province`, `postcode`, `taxNumber`,`logo`,`stamp`) VALUES (?,?,?,?,?,?,?,?,?,?)"
    db.query(sqlInsert, [websiteName, companyName,companyNumber,address, subdis, dis, province, postcode, taxNumber,logo,stamp], (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    })
});

router.put('/', (req, res) => {

    const websiteName = req.body.websiteName;
    const companyName = req.body.companyName;
    const companyNumber = req.body.companyNumber;
    const taxNumber = req.body.taxNumber;
    const address = req.body.Address;
    const subdis = req.body.subdis;
    const dis = req.body.dis;
    const province = req.body.province;
    const postcode = req.body.postcode;
    const logo = req.body.logo;
    const stamp = req.body.stamp;

    const sqlUp = "UPDATE `website` SET `websiteName`=?,`companyName`=?,`companyNumber`=?,`address`=?,`subdistrict`=?,`district`=?,`province`=?,`postcode`=?,`taxNumber`=?, `logo`=?, `stamp`=? WHERE 1"
    db.query(sqlUp, [websiteName, companyName,companyNumber, address, subdis, dis, province, postcode, taxNumber,logo,stamp], (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    })
});

router.get('/img', (req, res) => {

    const sqlSelect = "SELECT websiteName,logo FROM website"
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    })

});

export default router;
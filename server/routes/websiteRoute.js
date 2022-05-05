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
    const taxNumber = req.body.taxNumber;
    const address = req.body.Address;
    const subdis = req.body.subdis;
    const dis = req.body.dis;
    const province = req.body.province;
    const postcode = req.body.postcode;


    const sqlInsert = "INSERT INTO `website`(`websiteName`, `companyname`, `address`, `subdistrict`, `district`, `province`, `postcode`, `taxNumber`) VALUES (?,?,?,?,?,?,?,?)"
    db.query(sqlInsert, [websiteName, companyName, address, subdis, dis, province, postcode, taxNumber], (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    })
});

router.put('/', (req, res) => {

    const websiteName = req.body.websiteName;
    const companyName = req.body.companyName;
    const taxNumber = req.body.taxNumber;
    const address = req.body.Address;
    const subdis = req.body.subdis;
    const dis = req.body.dis;
    const province = req.body.province;
    const postcode = req.body.postcode;


    const sqlUp = "UPDATE `website` SET `websiteName`=?,`companyname`=?,`address`=?,`subdistrict`=?,`district`=?,`province`=?,`postcode`=?,`taxNumber`=? WHERE 1"
    db.query(sqlUp, [websiteName, companyName, address, subdis, dis, province, postcode, taxNumber], (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    })
});

export default router;
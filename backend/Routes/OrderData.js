const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    data.unshift({ Order_date: req.body.order_date });
    let eId = await Order.findOne({ 'email': req.body.email });
    console.log("eId::::", eId);
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: data
            }).then(() => {
                res.status(200).json({ success: true, message: "Order placed successfully!" });
            })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
    else {
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            ).then(() => {
                res.status(200).json({ success: true, message: "Order placed successfully!" });
            })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
    console.log("📦 Received orderData POST request:", req.body);

})

router.post('/myorderData',async (req, res) => {
     try{
        let myData=await Order.findOne({ 'email': req.body.email });
        res.json({orderData: myData});

     }catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
     }
})

module.exports = router;

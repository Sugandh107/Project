const express = require('express');
const Payment = require('../models/Payment');
const Carts = require('../models/Carts');
const router = express.Router();
const mongoose =require('mongoose')
const ObjectId=mongoose.Types.ObjectId;

router.post('/',async(req,res)=>{
    const payment =req.body;
    console.log(payment);
    try {
        const paymentrequest=await Payment.create(payment); 

        const cartIds = payment.cartitems.map(id => new ObjectId(id));
        const deletedCartRequest= await Carts.deleteMany({_id:{$in:cartIds}})
        res.status(200).json({paymentrequest,deletedCartRequest})
        
    } catch (error) {
        console.log(error);
        res.status(404).json({message:error})
    }
});

router.get('/',async(req,res)=>{
    try {
        const payment = await Payment.find({})
        res.status(200).json(payment)
    }catch (error) {
        res.status(500).json({ message: error.message });
    }

})
module.exports=router;
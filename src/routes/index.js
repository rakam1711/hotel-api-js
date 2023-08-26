const express = require('express');

const resturantRouter = require('./resturant.route');
const userRouter = require('./user.route');
const orderRouter = require('./order.route');

const router = express.Router()

router.use('/user', userRouter)
router.use('/resturant', resturantRouter)
router.use('/order', orderRouter)

router.get("/",function(req,res){
    res.render("home");
});
router.get("/about",function(req,res){
    res.render("about");
});
router.get("/contact",function(req,res){
    res.render("contact");
});
module.exports = router

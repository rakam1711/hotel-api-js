const express = require('express');

const resturantRouter = require('./resturant.route');
const userRouter = require('./user.route');
const orderRouter = require('./order.route');

const router = express.Router()

router.use('/user', userRouter)
router.use('/resturant', resturantRouter)
router.use('/order', orderRouter)

module.exports = router

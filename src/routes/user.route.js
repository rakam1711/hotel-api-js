const express = require('express')
// const { Response } = require('express')
const {
  loginController,
  registerController,
  addressController,
  userValidateController
} = require('../controllers/user.controller');

const protect =require('../middlewares/protect');

const userRouter = express.Router()

//get routes

userRouter.get('/login',(req,res)=>{
  res.render('login');
})

userRouter.get('/register',(req,res)=>{
  res.render('register');
})
userRouter.get('/page',(req,res)=>{
  res.render('up');
})


// User auth routes
userRouter.post('/login', async (req, res) => {
  const response = await loginController(req)
  res.json(response).status(200)
})

userRouter.post('/register', async (req, res) => {
  const response = await registerController(req)
  res.json(response).status(200)
})

// User features routes
userRouter.get('/validate', protect, async (req, res) => {
  const response = await userValidateController(req)
  res.json(response)
})

userRouter.post('/address', protect, async (req, res) => {
  const response = await addressController(req)
  res.json(response).status(200)
})

module.exports = userRouter

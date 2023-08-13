const express = require('express')
// const { Response } = require('express')
const {
  loginController,
  registerController,
  addressController,
  userValidateController
} = require('../controllers/user.controller');

// const protect from '../middlewares/protect'

const userRouter = express.Router()

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

export default userRouter

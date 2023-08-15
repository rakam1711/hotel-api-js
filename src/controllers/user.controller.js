const db =require('../database');
// import type { DataReturnType, Request } from '../typings'

const { Users } = db

// Auth functions
// Login Controller Function
exports.loginController = async (req, res, next)=> {
  const { email, password } = req.body
  const errors = []
  const data = {}

  try {
    const user = await Users.findOne({ email }).select('+password')
    if (!user) {
      throw new Error('User not found')
    }

    const isMatch = await user.verifyPassword(password)
    if (!isMatch) {
      throw new Error('Email and Password do not match')
    }

    const token = user.getSignedToken()
    if (!token) {
      throw new Error('Unable to login the user')
    }

    data.token = token
  } catch (error) {
    if (typeof error === typeof new Error('')) {
      errors.push(error.message)
    } else {
      errors.push(String(error))
    }
  }

  return {
    success: errors.length < 1,
    errors,
    data
  }
}

// Register Controller Functions
exports.registerController = async (req) => {
  const { email, password, firstname, lastname, phone } = req.body
  const errors = []
  const data= {}

  try {
    const checkEmailExists = await Users.findOne({ email })
    if (checkEmailExists) {
      throw new Error('Email already in use')
    }

    const checkPhoneExists = await Users.findOne({ phone })
    if (checkPhoneExists) {
      throw new Error('Phone number already in use')
    }

    const user = await Users.create({ email, password, firstname, lastname, phone })

    const token = user.getSignedToken()
    data.token = token
  } catch (error) {
    if (typeof error === typeof new Error('')) {
      errors.push(error.message)
    } else {
      errors.push(String(error))
    }
  }

  return {
    success: errors.length < 1,
    errors,
    data
  }
}

// Other functions
exports.userValidateController = async (req ,res, next) => {
  const errors = []
  const data= {}

  try {
    const user = await db.Users.findById(req.user)

    if (!user) {
      throw new Error('User does not exist')
    }

    data.user = user
  } catch (error) {
    if (typeof error === typeof new Error('')) {
      errors.push(error.message)
    } else {
      errors.push(String(error))
    }
  }

  return {
    success: errors.length < 1,
    errors,
    data
  }
}

exports.addressController = async (req)=> {
  const { address } = req.body
  const errors = []
  const data= {}

  try {
    const user = await Users.findByIdAndUpdate(req.user, { address })
    if (!user) {
      throw new Error('User not found')
    }
  } catch (error) {
    if (typeof error === typeof new Error('')) {
      errors.push(error.message)
    } else {
      errors.push(String(error))
    }
  }

  return {
    success: errors.length < 1,
    errors,
    data
  }
}

const db = require('../database')

// Resturant Auth Funtions
exports.loginResturantController = async (req)=> {
  const { email, password } = req.body
  const errors = []
  const data = {}
  

  try {
    const resturant = await db.Resturants.findOne({ email }).select('+password')

    if (!resturant) {
      throw new Error('Resturant does not exist')
    }

    // * Fixed always getting true even with wrong password by adding await
    const isPasswordMatch = await resturant.verifyPassword(password)
    

    if (!isPasswordMatch) {
      throw new Error('Email and Password do not match')
    }
    const token = resturant.getSignedToken()
    if (!token) {
      throw new Error('Unable to login')
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

exports.registerResturantController = async (req)=> {
  const { name, email, password, description, contacts, image, tags, address } =
    req.body

  const errors = []
  const data = {}

  try {
    const doesEmailExists = await db.Resturants.findOne({ email })
    if (doesEmailExists) {
      throw new Error('Email already in use')
    }

    const resturant = await db.Resturants.create({
      name,
      email,
      password,
      description,
      contacts,
      image,
      tags,
      address
    })

    const token = resturant.getSignedToken()

    if (!token) {
      throw new Error('Unable to login')
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

// Other Resturant Functions

exports.validateResturant = async (req) => {
  const errors = []
  const data = {}

  try {
    const resturant = await db.Resturants.findById(req.resturant)

    if (!resturant) {
      throw new Error('Resturant does not exist')
    }

    data.resturant = resturant
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

exports.getResturantMenuController = async (req) => {
  const errors= []
  const data = {}

  try {
    const items = await db.MenuItems.find({
      resturant: req.params.resturantid
    })
    data.items = items
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

exports.addMenuItemController = async (req) => {
  const { name, description, thumbnail, price, quantity, category, tags } =
    req.body

  const errors = []
  const data = {}

  try {
    const item = await db.MenuItems.create({
      resturant: req.resturant,
      name,
      description,
      thumbnail,
      price,
      quantity,
      category,
      tags
    })

    data.item = item
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

exports.removeMenuItemController = async (req) => {
  const errors= []
  const data = {}

  try {
    await db.MenuItems.findByIdAndDelete(req.params.itemid)
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

exports.updateMenuItemController = async (req)=> {
  const { menuitem } = req.body
  const errors = []
  const data = {}

  try {
    const item = await db.MenuItems.findByIdAndUpdate(
      req.params.itemid,
      menuitem
    )
    data.item = item
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

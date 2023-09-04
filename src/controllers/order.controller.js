const db = require('../models');


exports.addOrderController = async (req) => {
  const errors = []
  const data = {}

  const {
    resturant,
    items,
    paymentMethod,
    paid
  } = req.body

  const randomDate = (start, end) => {
    return new Date(start + Math.random() * (end - start))
  }

  const calculateTotal = (items) => {
    let total = 0
    items.forEach(item => {
      total = total + Number(item.total)
    })

    return total
  }

  try {
    const order = await db.Orders.create({
      user: req.user,
      resturant,
      items,
      estimatedDeliveryTime: randomDate(Date.now(), Date.now()),
      total: calculateTotal(items),
      paymentMethod,
      paid
    })

    data.order = order
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

exports.updateOrderController = async (req) => {
  const errors = []
  const data = {}
  const { userorder } = req.body

  try {
    const order = await db.Orders.findByIdAndUpdate(req.params.orderid, userorder)
    if (!order) {
      throw new Error('Order does not exist')
    }

    data.order = order
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

exports.deleteOrderController = async (req) => {
  const errors= []
  const data = {}

  try {
    await db.Orders.findByIdAndDelete(req.params.orderid)
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

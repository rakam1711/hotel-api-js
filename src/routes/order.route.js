const { Router } = require('express');
const protect = require('../middlewares/protect')

const orderRouter = Router()

orderRouter.post('/add', async (req, res, next) => {
  await protect(req, res, next)
})

orderRouter.post('/:orderid/update', async (req, res, next) => {
  await protect(req, res, next)
})

orderRouter.post('/:orderid/delete', async (req, res, next) => {
  await protect(req, res, next)
})

module.exports = orderRouter

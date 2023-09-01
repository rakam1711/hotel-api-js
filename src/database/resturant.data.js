const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const { JWT_SECRET_KEY } = require('../configs/constants');

const resturantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    select: false
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  description: {
    type: String,
    required: true
  },

  contacts: {
    type: {
      emails: {
        type: [String],
        required: true
      },
      phones: {
        type: [String],
        required: true
      }
    },
    require: true
  },

  image: {
    type: String,
    require: true
  },

  tags: {
    type: [String],
    require: true
  },

  address: {
    type: String,
    require: true
  }
})

resturantSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

resturantSchema.methods.verifyPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

resturantSchema.methods.getSignedToken = function () {
  return jwt.sign({ resturantid: this._id, role: 'resturant' }, JWT_SECRET_KEY, {
    expiresIn: '3d'
  })
}

const Resturants = mongoose.model('Resturants', resturantSchema)
module.exports = Resturants

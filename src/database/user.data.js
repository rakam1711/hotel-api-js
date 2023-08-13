const mongoose = require('mongoose');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Mongoose.Schema({
    email: {
        type:String,
        unique:true,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    firstname: {
        type: String,
        required: true
    },
    
    lastname: {
        type: String,
        required: true
    },
    
    phone: {
        type: String,
        required: true
    },
    
    address: {
        type: String,
        required: false
    }


});
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  })
  
  userSchema.methods.verifyPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
  }
  
  userSchema.methods.getSignedToken = function () {
    return jwt.sign({ userid: this._id, role: 'user' }, JWT_SECRET_KEY, {
      expiresIn: '3d'
    })
  }
  
  const Users = mongoose.model('Users', userSchema)

  module.exports = Users
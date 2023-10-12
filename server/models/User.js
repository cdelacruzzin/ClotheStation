const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Cart = require('./Cart');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  cartCount: {
    type: Number,
    default: 0, // You can set a default value if needed
  },
  savedProducts: [{
    quantity: {
      type: Number, 
      max: 1,
      required: true
    },
    product:  {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
  }],
  cart: [{
    purchaseDate: {
      type: Date,
      default: Date.now
    },
    quantity: {
      type: Number,
      required: true
    },
    product:  {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
  }]



});

// set up pre-save middleware to create password
//this should hash  the pw 
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    console.log(password)
    console.log(this.password)
    return await bcrypt.compare(password, this.password);

  };

const User = mongoose.model('User', userSchema);

module.exports = User;

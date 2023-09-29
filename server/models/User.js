const mongoose = require('mongoose');

const { Schema } = mongoose;
// const bcrypt = require('bcrypt');
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
  cartCount: {
    type: Number,
    default: 0, // You can set a default value if needed
  },
  // cart:
  // {
  //   product: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Product',
  //     required: true,
  //   },
  //   quantity: {
  //     type: Number,
  //     required: true,
  //   },
  //  [Cart.schema]
  // },


  // [
  //     {
  //     purchaseDate: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //     product: [
  //       {
  //         type: Schema.Types.ObjectId,
  //         ref: "Product",
  //         quantity: {
  //           type: Number,
  //           required: true,
  //         }
  //       },
  //     ],
  //   }
  // ]
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

// hash user password
// userSchema.pre('save', async function (next) {
//     if (this.isNew || history.isModified('password')) {
//         const saltRounds = 10;
//         this.password = await bcrypt.hash(this.password, saltRounds);
//     } 

//     next();
// });

// custom method to validate password at login
// userSchema.methods.isCorrectPassword = async function (password) {
//     return bcrypt.compare(password, this.password);
// }

const User = mongoose.model('User', userSchema);

module.exports = User;

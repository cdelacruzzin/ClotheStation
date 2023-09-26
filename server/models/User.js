const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Cart = require('./Cart');

const userSchema = new Schema(
    {
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
        },
        cart: [Cart.schema]
    }
)

// hash user password
// userSchema.pre('save', async function (next) {
//     if (this.isNew || history.isModified('password')) {
//         const saltRounds = 10;
//         this.password = await bcrypt.hash(this.password, saltRounds);
//     } 

//     next();
// });

// custom method to validate password at login
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);

module.exports = User;
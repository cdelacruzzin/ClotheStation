const { AuthentificationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id}).populate('products');
            }
            throw new AuthentificationError('You need to be logged in!');
        },
    },



    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthentificationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthentificationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
    },
};

module.exports = resolvers;
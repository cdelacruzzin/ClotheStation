// import jsonwebtoken
const jwt = require("jsonwebtoken");

// create a secret
const secret = "ilovesushi";
// create expiration of 2 hours
const expiration = "2h";

module.exports = {
  // create authMiddleware that takes req object
  authMiddleware: function ({ req }) {
    // allow token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // token is split into array and returns actual token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    // if token can be verified add decoded users data to request to access it by resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    // return req object to access it with resolver as 'context'
    return req;
  },

  // create new token that takes email, username and id as arguments
  signToken: function ({ email, username, _id }) {
    // create payload with values
    const payload = { email, username, _id };
    // create new token with payload as data, created secret and expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

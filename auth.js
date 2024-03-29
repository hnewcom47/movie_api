/**
 * This has to be the same key used in the JWTStrategy from the "passport.js" file
*/

const jwtSecret = 'your_jwt_secret';

const jwt = require('jsonwebtoken'),
  passport = require('passport');

/**
*  Local passport.js file
*/
require('./passport');

/**
 * This generates the JSON Web Token and sets its expiration to 7 days
 * @param {*} user 
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //This is the username you're encoding in the JWTStrategy
    expiresIn: '7d', // This specifies that the token will expire in 7 days
    algorithm: 'HS256' // This is the algorithm used to "sign" or encode the values of the JWTStrategy
  });
};

/**
 * POST Login
 * @param {} router 
 */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
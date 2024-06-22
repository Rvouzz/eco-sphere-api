// routes/auth.js
const express = require('express');
const passport = require('passport');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/database');
const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/' }),
  (req, res) => {
    const token = jwt.sign(
      { id_user: req.user.id_user, email: req.user.email },
      secretKey,
      { expiresIn: "1h" }
    );
    // Extract user data
    const user = {
      token: token,
      id_user: req.user.id_user,
      email: req.user.email,
      googleid: req.user.googleid,
      img_profile: req.user.img_profile,
      nama_depan: req.user.nama_depan,
      role: req.user.role,
    }
    

    // Serialize user data as a query string
    const query = querystring.stringify(user);

    // Redirect to the client-side app with user data in the query string
    res.redirect(`http://localhost:5173/?${query}`);
  }
);

module.exports = router;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
},
async (token, tokenSecret, profile, done) => {
  try {
    console.log('Google profile:', profile);
    
    const [existingUser] = await UserModel.getUserByEmail(profile.emails[0].value);

    if (existingUser.length > 0) {
      console.log('User exists:', existingUser[0]);
      return done(null, existingUser[0]);
    }

    const newUser = {
      email: profile.emails[0].value,
      nama_depan: profile.name.givenName,
      nama_belakang: profile.name.familyName,
      img_profile: profile.photos[0].value,
      googleid: profile.id
    };

    const [createdUser] = await UserModel.createNewUser(newUser, profile.name.givenName, profile.name.familyName);
    console.log('New user created:', createdUser[0]);
    return done(null, createdUser[0]);
  } catch (err) {
    console.error('Error in Google strategy:', err);
    return done(err, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id_user);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log(`Deserializing user with ID: ${id}`);
    const [user] = await UserModel.getUserById(id);
    if (user.length > 0) {
      console.log('User found:', user[0]);
      done(null, user[0]);
    } else {
      console.error('User not found:', id);
      done(new Error('User not found'), null);
    }
  } catch (err) {
    console.error('Error deserializing user:', err);
    done(err, false);
  }
});

module.exports = passport;

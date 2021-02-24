const express = require('express');
const app = express();
const passport = require('passport');
const port = process.env.PORT || 9800;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(passport.initialize());

app.get('/',(req,res) => {
    res.send("<a href='/auth/google'>Login With Google</a>")
})

app.get('/profile',(req,res) => {
    res.send(userprofile)
})

passport.serializeUser((user,cb) => {
    cb(null,user)
})

app.get('/err',(req,res) => {
    res.send("Error while login")
})

passport.use(new GoogleStrategy({
    clientID: '1001095129364-m4l35p2r5rqobhajmr87kafkeeupi3tt.apps.googleusercontent.com',
    clientSecret: 'RkyMKMurN99jifcYMLoHhDa8',
    callbackURL: "http://localhost:9800/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       userprofile=profile
       return done(null,userprofile)
  }
));

//open google oauth page
app.get('/auth/google',
  passport.authenticate('google', { scope:['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/err' }),
  function(req, res) {
    res.redirect('/profile');
  });

app.listen(port)
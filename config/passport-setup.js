const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const Keys = require('./key');
passport.use(
    new GoogleStrategy({
    // options for the google stat
    callbackURL:"/auth/google/redirect",
    clientID:Keys.google.clientID,
    clientSecret:Keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
    // passport callback function 
   console.log(profile)
})
)
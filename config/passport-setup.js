const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const Keys = require('./key');
const User = require("../models/user"); 
passport.use(
    new GoogleStrategy({
    // options for the google stat
    callbackURL:"/auth/google/redirect",
    clientID:Keys.google.clientID,
    clientSecret:Keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
// check if user already exists 
User.findOne({googleId:profile.id}).then((currentUser)=>{
if(currentUser){
    // already have user 
    console.log('user is:',currentUser)
}else{
    // if not , createa a new user
    new User({
        username:profile.displayName,
        googleId:profile.id
    }).save().then((newUser)=>{
        console.log("new user created:" + newUser)
    })
}
})

})
)
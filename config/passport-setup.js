const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const Keys = require('./key');
const User = require("../models/user"); 
    // transform into cookie
passport.serializeUser((user,done)=>{
    done(null,user.id)
});

// take cookies to browsers
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    });
});

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
    // console.log('user is:',currentUser)
    done(null,currentUser)
}else{
    // if not , create a new user
    new User({
        username:profile.displayName,
        googleId:profile.id
    }).save().then((newUser)=>{
        // console.log("new user created:" + newUser)
        done(null,newUser);
    })
}
})

})
)
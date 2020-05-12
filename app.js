const express = require('express');
const app = express();
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require('./config/passport-setup.js');
const mongoose = require('mongoose');
const cookieSession = require("cookie-session");
const Keys = require("./config/key");
const passport = require('passport');
//set up view engine 

app.set('view engine','ejs');


app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[Keys.session.cookieKey]
}));

// initialize passport 
app.use(passport.initialize());
app.use(passport.session())

// set up routes  
app.use("/auth",authRoutes);
app.use('/profile',profileRoutes)
// create home route 
app.get('/',(req,res)=>{
    // So that i can acces the codes 
res.render('home',{user:req.user});
})




app.listen(3400,()=>{
    console.log("app listening to 3400 ");
})


// connect to mongodb
mongoose.connect('mongodb://localhost/googleAuth',
{ 
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology:true
  },()=> console.log('Database successfully connected')
  )
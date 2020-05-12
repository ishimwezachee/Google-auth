const router = require("express").Router();
const passport = require("passport");
// auth login 

router.get("/login",(req,res)=>{
    res.render('login');
});
// auth logout 
router.get('/logout',(req,res)=>{
  res.send("logging out")  
})


// auth with google 
router.get('/google',passport.authenticate("google",{
    scope:['profile']
}))

// callback route for google to redict ;

router.get('/google/redirect',(req,res)=>{
 res.send("you reached the call back URL")   
})

module.exports = router;
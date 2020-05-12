const router = require("express").Router();
const passport = require("passport");
// auth login 

router.get("/login",(req,res)=>{
    res.render('login',{user:req.user});
});
// auth logout 
router.get('/logout',(req,res)=>{
 req.logout();
 res.redirect('/')
})


// auth with google under help of passport 
router.get('/google',passport.authenticate("google",{
    // this is what we want to retrieve 
    scope:['profile']
}))

// callback route for google to redrect  ;
// exchange code ofr profile info 

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
//  res.send(req.user)   
res.redirect('/profile/',{user:req.user})
})

module.exports = router;
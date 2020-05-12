const router = require('express').Router();

const authChek = (req,res,next)=>{
 if(!req.user){
     // if user is not logge in 
     res.redirect('auth/login')
 }else{
     // if logged in 
     next();
 }
}

router.get("/",authChek,(req,res)=>{
    res.render('profile',{user:req.user});
});

module.exports = router;
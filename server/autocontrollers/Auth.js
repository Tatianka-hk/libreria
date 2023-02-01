const { change_password } = require( "../middleware/auth");
const User = require( '../models/usar')
const jwt = require('jsonwebtoken')

exports.register_post =(req,res) => { 
    try{
        let pas = change_password(req.body.password);
        let user = User({login:req.body.login, email:req.body.email, password : pas,role: "user"});
        user.save();
        let usario ={login:req.body.login, email:req.body.email, id:user._id}
        console.log(usario)
        let a_t = jwt.sign(usario.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        res.send({token:a_t})
    } catch (err){ console.log(err)};
    
}

exports.login_post =(req,res) => { 
    try{
        let pas = change_password(req.body.password);
        User
            .findOne({login:req.body.login, password:pas})
            .then((data)=> {
                console.log(data)
                if (data == null){
                    res.send("no compare");
                }
                else{
                    let usario ={login:data.login, email:data.email, id:data._id}
                    console.log(usario)
                    let a_t = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
                    res.send({token:a_t, role:data.role})
                }
                
            } )
            .catch((error)=>{console.log(error)})
       
    } catch (err){ console.log(err)}
    
}



exports.register_with_google_post =(req,res) => { 
    try{
        let user = User({googleId: req.body.googleId ,role: "user", login:req.body.login, email:req.body.email});
        user.save();
        let usario ={login:req.body.login, email:req.body.email, id:user._id}
        let a_t = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        res.send({token:a_t})
    } catch (err){ console.log(err)};
    
}

exports.register_with_facebook_post =(req,res) => { 
    try{
        let user = User({facebookId: req.body.id ,role: "user", login:req.body.login});
        user.save();
        let usario ={login:req.body.login, id:user._id}
        let a_t = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        res.send({token:a_t})
    } catch (err){ console.log(err)};
    
}

exports.login_with_facebook_post =(req,res) => { 
    try{
        User
            .findOne({facebookId:req.body.id, login: req.body.login})
            .then((data)=> {
                if (data == null){
                    res.send("no compare");
                }
                else{
                    let usario ={login:req.body.login, id:data._id}
                    let a_t = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
                    res.send({token:a_t})
                }
                
            } )
            .catch((error)=>{console.log(error)})
    } catch (err){ console.log(err)};
    
}

exports.login_with_google_post =(req,res) => { 
    try{
        User
            .findOne({login:req.body.login, googleId: req.body.googleId})
            .then((data)=> {
                if (data == null){
                    res.send("no compare");
                }
                else{
                    let usario ={login:data.login, email:data.email, id:data._id}
                    let a_t = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
                    res.send({token:a_t, role:data.role})
                }
                
            } )
            .catch((error)=>{console.log(error)})
    } catch (err){ console.log(err)};
    
}


exports.check_admin = (req,res)=>{
    try{
        console.log(req.user)
        User
            .findById(req.user.id)
            .then((data)=>{
                if (data.role != "admin"){
                    res.send({mes:"no"})
                    console.log("no admin")
                }
                else{
                    res.send("si")
                    console.log("admin")
                }
            })

    }catch(err){console.log(err)}
}

exports.add_admin =(req,res) => { 
    try{
        let pas = change_password(req.body.password);
        let user = User({login:req.body.login, email:req.body.email, password : pas,role: "admin"});
        user.save();
        res.send();
    } catch (err){ console.log(err)};
    
}


exports.delete_user =(req,res) => { 
    try{
        User
            .findByIdAndDelete(req.user.id)
            .then((data)=>console.log("deleted"))
            .catch((err)=> console.log(err))
    } catch (err){ console.log(err)};
    
}
const express=require('express');
const port = 8000;
const path=require('path');
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app = express();
const bodyParser=require('body-parser');



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({
    extended:true
}));
app.use(express.static('views'));
//middleware
// app.use(function(req,res,next){
    
//     next();
// })

var contact=[
    {
        name:"sanath",
        password:"asasasas"
    },
    {
        name:"sanath23",
        password:"asasasas"
    },
    {
        name:"sanath45",
        password:"asasasas"
    }
]

app.get('/',function(req,res){
    Contact.find({},function(err,c){
        if(err){
            console.log("lol");
            return;
        }
        return res.render('home',{title:"I m Rock Star",lol:c});


    })
    
});

app.post('/contact',function(req,res){
    // contact.push(req.body);
    // res.redirect('/');
    Contact.create({
        name:req.body.name,
        password:req.body.password
    },function(err,newcontact){
        if(err)
        {
            console.log("error in creating contact")
            return;

        }
        console.log('********',newcontact);
        return res.redirect('/');
    })
});
app.get('/delete-contact',function(req,res){
   console.log(req.query.id)
   let id =req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            return;
        }
        return res.redirect('/');
    });
   

})



app.listen(port,function(err){
    if(err)
    {
        console.log("error in runnning the server",err);
    }
    console.log("server is running on port",port);

});
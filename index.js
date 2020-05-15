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
app.use(express.static('./assets'));
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

app.post('/contact', async function(req,res){
    // contact.push(req.body);
    // res.redirect('/');
    let contact=await Contact.create({
        name:req.body.name,
        password:req.body.password
    });
    if(req.xhr){
        return res.status(200).json({
            data:
            {
                contact:contact
            },message:"contact added"
        })
    }
        return res.redirect('/');
    
});
app.get('/delete-contact',async function(req,res){
   console.log(req.query.id)
   let id =req.query.id;
    let contact=await Contact.findByIdAndDelete(id)
        
    if(req.xhr){
        return res.status(200).json({
            data:
            {
                contact:id
            },message:"contact deleted"
        })
    }
        return res.redirect('/');
    
   

})



app.listen(port,function(err){
    if(err)
    {
        console.log("error in runnning the server",err);
    }
    console.log("server is running on port",port);

});
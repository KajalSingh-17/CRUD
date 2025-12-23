const express = require('express') ;
const app = express();
const userModel = require('./models/user')
const path = require('path');
 
app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public'))) 

app.get('/', (req ,res)=>{
  res.render('index')
});



app.post('/create',async(req,res)=>{
  let{name,image,email} = req.body;
let createduser = await userModel.create({
name,
imageurl:image,
email,
}) 
res.redirect('/read');
})


app.get('/read',async(req,res)=>{
let users = await userModel.find();

  res.render('read',{users});
})

app.get('/delete/:id',async(req,res)=>{
  let deleteduser = await userModel.findOneAndDelete({_id:req.params.id});
  res.redirect('/read');
})

app.get('/edit/:id',async(req,res)=>{
  let val = await userModel.findOne({_id:req.params.id});
  res.render('edit',{val})
})

app.post('/update/:id',async(req,res)=>{
let{image,name,email} = req.body ;
let updateduser = await userModel.findOneAndUpdate({_id:req.params.id},{name,image,email},{new:true});
res.redirect('/read');
})

app.listen(3000);


console.log('http://localhost:3000/')
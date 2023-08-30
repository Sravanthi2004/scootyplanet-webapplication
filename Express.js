var express = require('express')  
var app = express()

app.use(express.static('public'));



const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./key.json");
 
initializeApp({
    credential: cert(serviceAccount)
  });
  
const db = getFirestore();
  
app.get('/signup', function (req, res) {  
res.sendFile( __dirname + "/public/" + "SignUp.html" );

  
})  

  
app.get('/signupSubmit', function (req, res) {  
    db.collection('Users').add({
        FullName:req.query.firstname,
        Email:req.query.email,
        Password:req.query.password,
    }).then(()=>{
      res.send("signup sucessfull, please login ")
    })
})
app.get('/login', function (req, res){
    res.sendFile( __dirname + "/public/" + "login.html" );

})

app.get("/loginSubmit", function (req,res) {  
    console.log(req.query);
    db.collection('Users')
   .where("Email","==",req.query.email)
   .where("Password","==",req.query.password)
   .get()
   .then((docs)=>{
    if(docs.size>0){
        res.send("successfull")
    }
    else{
        res.send("Fail")
    }
   })
})

app.listen(3000);
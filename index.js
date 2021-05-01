const express = require('express')
const app = express()
const mysql = require('mysql')
const quertstring = require('querystring')

const conn = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'onlineshoppingdemo'
})
conn.connect(function (err){
   if(err) throw err;
   console.log("connection created")
})
app.get('/',function (req,res){
   res.send('welcome to home page');
})
const port = 4000
app.listen(port, function (error){
   if(error) throw error;
   console.log(`express server is running on http://localhost:${port}`);
})
app.use(express.static('public'))

app.get('/signup',function (req,res){
   res.redirect('signupusingAJAX.html');
})
// app.post('/signupaction' , function (req,res){
//    let requestdata = '';
//    req.on('data',function (data){
//       requestdata += data;
//    })
//    let postdata = {};
//    req.on('end', function (){
//       postdata = quertstring.parse(requestdata);
//       console.log(postdata);
//       console.log(postdata.username);
//    })
//    res.send('data recieved');
// })
app.get('/signupaction', function (req,res){
   let username = req.query.username;
   let password = req.query.password;
   let firstname = req.query.firstname;
   // console.log('username is '+username+' password is '+password);
   //
   // let userobj = {username : username, password : password, firstname : firstname};
   // let response = JSON.stringify(userobj);
   // res.send(response);
   let Query ="INSERT INTO `user_records`(`username`, `firstname`, `password`) VALUES ('"+username+"','"+firstname+"','"+password+"')"
   console.log(Query);

   conn.query(Query,function (err,result){
      if(err) throw err;
      console.log("data saved");
      res.send("signup success");
   })

   // res.setHeader('context-type', 'text/html');
   // res.write('<h2>data recieved</h2>');
   // res.write('<table border="1">');
   // res.write('<tr><td>username</td><td>'+username+'</td></tr>');
   // res.write('<tr><td>password</td><td>'+password+'</td></tr>');
   // res.write('<tr><td>firstname</td><td>'+firstname+'</td></tr>');
   // res.write('</table>');
   // res.end();


})
app.get('/viewusers',function(req,res){
   let selectQuery = "SELECT * FROM `user_records`";
   conn.query(selectQuery,function (error,row){
      if(error) throw error;
      console.log(row);
      res.send(row)
   })
})

app.get("/userview",function (req,res){
   res.redirect("viewusers.html");
})
app.get("/deleteuser" , function (req,res){
   let username = req.query.username;
   let deleteQuery = "DELETE FROM `user_records` WHERE username ='"+username+"'";
   conn.query(deleteQuery,function (err){
      if(err) throw err;
      console.log(deleteQuery);
      res.send("succees")
   })
})

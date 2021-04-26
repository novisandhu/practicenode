const express = require('express')
const app = express()
const quertstring = require('querystring')

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
   console.log('username is '+username+' password is '+password);

   let userobj = {username : username, password : password, firstname : firstname};
   let response = JSON.stringify(userobj);
   res.send(response);

   // res.setHeader('context-type', 'text/html');
   // res.write('<h2>data recieved</h2>');
   // res.write('<table border="1">');
   // res.write('<tr><td>username</td><td>'+username+'</td></tr>');
   // res.write('<tr><td>password</td><td>'+password+'</td></tr>');
   // res.write('<tr><td>firstname</td><td>'+firstname+'</td></tr>');
   // res.write('</table>');
   // res.end();


})

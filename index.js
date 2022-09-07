const express = require("express");
const app = express();
const port =7000

//database connectivity
const mysql = require("./connection").con

//hbs is javaScript engine 
//hbs: Adapter for Handlebars.js, an extension of Mustache.js template engine.
//configuration
//by using set method we set hbs engine
//bydefault it look for view directory so it is mandetory to add view directory in project
app.set("view engine", "hbs"); //to set view engine 
app.set("views", "./view"); //to locate the path of view directory


//providing knowledge about css to express
app.use(express.static(__dirname+ "/public"));


//Routing
 app.get("/",(req,res)=>{
    res.render("index")
    //here we are not using res.send method cause hbs will not allow,we have to render it in hbs
    
 });

 app.get("/add",(req,res)=>{
    res.render("add")
    
 });

 app.get("/search",(req,res)=>{
    res.render("search")
    
 });

 app.get("/update",(req,res)=>{
    res.render("update")
    
 });

 app.get("/delete",(req,res)=>{
    res.render("delete")
    
 });

 
 //fetching data from form => express good for request handling
//add student
 app.get("/addstudent", (req,res)=>{
    const { name, phone, email, gender}=req.query;

    //Sanitization=>to check that data is already present in the table or not
    let qry= "select * from users where emailid=? or phoneno=?";
    mysql.query(qry, [email, phone], (err, results)=>{

      if(err)
      throw err
      else{
         if(results.length >0){
            res.render("add", {checkmesg:true})
         }else{

            //Inserting data
            let qry2="insert into users values(?, ?, ?, ?)";
            mysql.query(qry2, [name, phone, email, gender], (err, results)=>{
              if(results.affectedRows >0) {
               res.render("add", {mesg: true})
              }  
            })
         }
      }
    }) 

   
 });

 //search student
 //fetching data from form 
 app.get("/searchstudent", (req,res)=>{

   const { phone }=req.query;

   let qry = "select * from users where phoneno=?";
   mysql.query(qry, [phone], (err, results) =>{
          
      if(err) throw err
      else{
         if(results.length >0){
            res.render("search", {mesg1:true, mesg2:false})
         
         }else{
            res.render("search", {mesg1:false, mesg2:true})
         }
      }
   })
    
 })

 app.get("/updatesearch", (req, res) => {

   const { phone } = req.query;

   let qry = "select * from users where phoneno=?";
   mysql.query(qry, [phone], (err, results) => {
       if (err) throw err
       else {
           if (results.length > 0) {
               res.render("update", { mesg1: true, mesg2: false, data: results })
           } else {

               res.render("update", { mesg1: false, mesg2: true })

           }

       }
   });
})
app.get("/updatestudent", (req, res) => {
   // fetch data

   const { phone, name, gender } = req.query;
   let qry = "update users set username=?, gender=? where phoneno=?";

   mysql.query(qry, [name, gender, phone], (err, results) => {
       if (err) throw err
       else {
           if (results.affectedRows > 0) {
               res.render("update", { umesg: true })
           }
       }
   })

});

app.get("/removestudent", (req, res) => {

   // fetch data from the form

  
   const { phone } = req.query;
   
   let qry = "delete from users where phoneno=?";
   mysql.query(qry, [phone], (err, results) => {
       if (err) throw err
       else {
           if (results.affectedRows > 0) {
               
               res.render("delete", { mesg1: true, mesg2: false})
           } else {

               res.render("delete", { mesg1: false, mesg2: true })

           }

       }
   });
});

app.get("/view", (req, res) => {
   let qry = "select * from users ";
   mysql.query(qry, (err, results) => {
       if (err) throw err
       else {
           res.render("view", { data:results});
       }

   });

});


 //creating server
 app.listen(port, (err)=>{
    if(err)
    throw err
    else
       console.log("server is running at port", port);
       
 });
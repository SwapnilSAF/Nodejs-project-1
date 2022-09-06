const mysql= require('mysql');

const con =mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"Current-Root-Password",
    database:"student"});
    
    con.connect((err)=>{
        if(err) throw err;
        console.log("Connection created...!!");
    })

    module.exports.con = con;


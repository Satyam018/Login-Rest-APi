const express=require('express');
const mysql=require('mysql');
const app=express()
const bodyparser=require('body-parser')

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.listen(9001,()=>{
    console.log('connected om 9001')
})

var connection=mysql.createConnection({
    connectionLimint:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'loginp1'

})
connection.connect(function(error){
    if(!!error){
        console.log('error')
    }else{
        console.log('connected')
    }
})
app.get('/login',function(req,res){
    
            
    console.log('connected')
    connection.query("SELECT * FROM login",function(error,rows){
                
        if(!!error){
            console.log('error in query')
        }else{
            res.send(rows)
        }
    });   

   }
); 

app.post('/login',(req,res)=>{
    const params=req.body;
    connection.query("INSERT INTO login Set ?",params,(error,rows)=>{
        if(!!error){
            console.log('error in query')
        }else{
            res.send(params)
        }
    })
    console.log(params)
})
app.delete('/login/:email',function(req,res){
    connection.query("DELETE FROM login WHERE email=?",[req.params.email],function(error,rows){
           
        if(!!error){
            console.log('error in query')
        }else{
            res.send("deleted" )
        }
    });
})
app.put("/login",function(req,res){
    const {email,password}=req.body
   connection.query("UPDATE login SET password=? WHERE email = ?",[password,email],function(error,rows){
           
           if(!!error){
               console.log('error in query')
           }else{
               res.send(req.body)
           }
       });
   }
)
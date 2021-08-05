const { response } = require('express');
var express= require('express');
var path=require('path');
var fs=require('fs');

var sql=require('./mysqlconnect');

const { request } = require('http');

var app=express(); 

//Middlware configuration:
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",function(req, res){
    res.sendFile("index.html");
});

/***Read All */
app.get("/api/orderitems",
        (request,response)=>{
                            var selectAllQuery="select * from orderitems ";
                             sql.query(selectAllQuery,function(err, data){
                            if(err){
                                console.log("error : "+err);
                            }
                            else
                            {
                                response.send(data);
                            }
        });

});


/***Read by Id */
app.get("/api/orderitems/:id", (request, response) => {
    var id =request.params.id;
    console.log(id);
     var selectAllQuery = "select * from orderitems where orderitemid = "+id;
     console.log(selectAllQuery);
     sql.query(selectAllQuery, function (err, data) {
       if (err) {
         console.log("error : " + err);
       } else {
         response.send(data);
       }
     });
   });



   
   /***Insert Data */
   app.post("/api/orderitems",(request,response)=>{
    var insertdata=request.body;
    
    console.log(insertdata);
    let Ordered=insertdata.Ordered;
    let Orderdate=insertdata.orderdate;
    //console.log(Orderdate);
    let customerid=insertdata.customerid;
    let amount=insertdata.amount;
      var insertQuery= "insert into orderitems values(?,?,?,?)";
      console.log("POST register is invoked...")
      //var insertQuery=request.body;
      sql.query(insertQuery,[Ordered,Orderdate,customerid,amount],function(err,data){
          if(err){
              console.log(err);
          }else{
            console.log(data);
            response.send(data);
          }
      });
      
    });
  
/****Update */
    app.put("/api/orderitems",(request,response)=>{
        
        var insertdata=request.body;
        //console.log(insertdata);
        let Ordered=insertdata.Ordered;
        let Orderdate=insertdata.orderdate;
        //console.log(Orderdate);
        let customerid=insertdata.customerid;
        let amount=insertdata.amount;
        

        var selectAllQuery = "delete from orders where customerid = "+customerid;
        console.log(selectAllQuery);
        sql.query(selectAllQuery, function (err, data) {
          if (err) {
            console.log("error : " + err);
          } else {
            //response.send(data);
            var insertQuery= "insert into orders values(?,?,?,?)";
          console.log("POST register is invoked...")
          //var insertQuery=request.body;
          sql.query(insertQuery,[Ordered,Orderdate,customerid,amount],function(err,data){
              if(err){
                  console.log(err);
              }else{
                console.log(data);
                //response.send('Succesfull Updated');
              }
          });
          
          }
        });
          
        });

/***Delete */
        app.delete("/api/orderitems", (request, response) => {
            var id =request.body;
            console.log(id);
            let deleteid=id.cusid;
             var selectAllQuery = "delete from orders where customerid = "+deleteid;
             console.log(selectAllQuery);
             sql.query(selectAllQuery, function (err, data) {
               if (err) {
                 console.log("error : " + err);
               } else {
                 response.send(data);
               }
             });
           });

   
/**********************************************Orders******************************************************************* */
/***Read All */
   app.get("/api/orders",
        (request,response)=>{
                            var selectAllQuery="select * from orders ";
                             sql.query(selectAllQuery,function(err, data){
                            if(err){
                                console.log("error : "+err);
                            }
                            else
                            {
                                response.send(data);
                            }
        });

});
/**** Read by Id */
app.get("/api/orders/:id", (request, response) => {
    var id =request.params.id;
    console.log(id);
     var selectAllQuery = "select * from orders where customerid = "+id;
     console.log(selectAllQuery);
     sql.query(selectAllQuery, function (err, data) {
       if (err) {
         console.log("error : " + err);
       } else {
         response.send(data);
       }
     });
   });

   /***Insert Data */
   app.post("/api/orders",(request,response)=>{
    var insertdata=request.body;
    
    console.log(insertdata);
    let Ordered=insertdata.Ordered;
    let Orderdate=insertdata.orderdate;
    //console.log(Orderdate);
    let customerid=insertdata.customerid;
    let amount=insertdata.amount;
      var insertQuery= "insert into orders values(?,?,?,?)";
      console.log("POST register is invoked...")
      //var insertQuery=request.body;
      sql.query(insertQuery,[Ordered,Orderdate,customerid,amount],function(err,data){
          if(err){
              console.log(err);
          }else{
            console.log(data);
            response.send(data);
          }
      });
      
    });
  
/****Update */
    app.put("/api/orders",(request,response)=>{
        
        var insertdata=request.body;
        //console.log(insertdata);
        let Ordered=insertdata.Ordered;
        let Orderdate=insertdata.orderdate;
        //console.log(Orderdate);
        let customerid=insertdata.customerid;
        let amount=insertdata.amount;
        

        var selectAllQuery = "delete from orders where customerid = "+customerid;
        console.log(selectAllQuery);
        sql.query(selectAllQuery, function (err, data) {
          if (err) {
            console.log("error : " + err);
          } else {
            //response.send(data);
            var insertQuery= "insert into orders values(?,?,?,?)";
          console.log("POST register is invoked...")
          //var insertQuery=request.body;
          sql.query(insertQuery,[Ordered,Orderdate,customerid,amount],function(err,data){
              if(err){
                  console.log(err);
              }else{
                console.log(data);
                //response.send('Succesfull Updated');
              }
          });
          
          }
        });
          
        });

/***Delete */
        app.delete("/api/orders", (request, response) => {
            var id =request.body;
            console.log(id);
            let deleteid=id.cusid;
             var selectAllQuery = "delete from orders where customerid = "+deleteid;
             console.log(selectAllQuery);
             sql.query(selectAllQuery, function (err, data) {
               if (err) {
                 console.log("error : " + err);
               } else {
                 response.send(data);
               }
             });
           });

app.listen(9500);
console.log("Server is Listening in 9500");
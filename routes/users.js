var express = require('express');
var router = express.Router();
const mysql = require("mysql2");
const cors = require("cors");
router.use(cors());
/* GET users listing. */

let sqlGetAll = `SELECT do FROM toDo`;

//PRINT ALL OF TODO
router.get('/print/toDo', function(req, res, next) {

  req.app.locals.con.connect( function(err) {
    if(err) console.log(err);

    req.app.locals.con.query(sqlGetAll, function(err, result) {
      if(err) console.log(err);
      
      console.log('result', result);
      res.send(result);

    });
    
  });
  
});


//DELETE FROM TODO
router.post('/delete/toDo', function(req, res, next) {

  req.app.locals.con.connect( function(err) {
    if(err) console.log(err);
    console.log('req.body.delete', req.body);
    let sqlDelete = `DELETE FROM toDo WHERE do="${req.body.delete}"`;

    req.app.locals.con.query(sqlDelete, function(err, result) {
      if(err) console.log(err);
      
      req.app.locals.con.query(sqlGetAll, function(err, result) {
        if(err) console.log(err);
        
        console.log('result', result);
        res.send(result);
  
      });

    });
    
  });
  
});





//ADD TO TODO
router.post('/add/toDo', function(req, res, next) {

  req.app.locals.con.connect( function(err) {
    if(err) console.log(err);

    let sqlSet = `INSERT INTO toDo (do) VALUES ("${req.body.add}")`;
   
    req.app.locals.con.query(sqlSet, function(err, result) {
      if(err) console.log(err);
      
      req.app.locals.con.query(sqlGetAll, function(err, result) {
        if(err) console.log(err);
        
        console.log('result', result);
        res.send(result);
  
      });

    });
    
  });
  
});






//UPDATE TODO
router.get('/toDo/update', function(req, res, next) {

  req.app.locals.con.connect( function(err) {
    if(err) console.log(err);

    let sqlUpdate = `UPDATE toDo SET do=${req.body.newDo} WHERE do=${req.body.oldDo}`;
    
    req.app.locals.con.query(sqlUpdate, function(err, result) {
      if(err) console.log(err);
      
      console.log('result', result);
      res.send(result);

    });
    
  });
  
});

// //ADD TO TODO
// router.get('/toDo', function(req, res, next) {

//   req.app.locals.con.connect( function(err) {
//     if(err) console.log(err);

//     let sqlSet = `INSERT INTO toDo (do) VALUES ("${req.body.do}")`;
//     let sqlGetAll = `SELECT * FROM toDo`;
//     let sqlGetSel = `SELECT id, do FROM toDo`;
//     let sqlUpdate = `UPDATE toDo SET do=${req.body.do} WHERE do=${req.body.id}`;
//     let squlDelete = `DELETE FROM toDo WHERE do=${req.body.delete}`;

//     req.app.locals.con.query(sqlSet, function(err, result) {
//       if(err) console.log(err);
      
//       console.log('result', result);
//       res.send(result);

//     });
    
//   });
  
// });

module.exports = router;

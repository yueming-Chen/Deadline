/*impletment RESTful architecture*/
var express = require('express');
var router = express.Router();
var mongoskin = require('mongoskin');
var async = require('async');
var account = process.env.account;
var pwd = process.env.pwsd;
var url = process.env.db_url;

var db = mongoskin.db('mongodb://' + account + ':' + pwd + url);


//Upload recipe
router.post('/upload',function(req,res,next){
	var method = req.body.method;
	var start = req.body.start;
	var due = req.body.due;
	db.collection('table').insert({method:method,start:start,due:due},function(err,results){
		console.log('success' + results);
		res.json({'state':err});
	});
	db.close();
});

//modify recipe
router.post('/modify',function(req,res,next){
	var method = req.body.method;
	var start = req.body.start;
	var due = req.body.due;
	var _id = req.body._id;
	db.collection('table').update({UUID:UUID},{UUID:UUID,method:method,start:start,due:due},function(err,results){
		console.log('success' + results);
		res.json({'state':err});
	});
	db.close();
});

//remove recipe
router.post('/remove',function(req,res,next){
	// suply UUID for unique ID
	var UUID = req.body._id;
	db.collection('table').remove({_id:_id},function(err,results){
	  if(err) console.log(err);
	  else console.log("success remove");
	});
	db.close();
});

//remove recipe
router.get('/getlist',function(req,res,next){
	// suply UUID for unique ID
	db.collection('table').find().toArray(function(err,results){
		console.log(results);
	  	if(results[0]){
	  		res.json({found:1,results:results});
	  	}else{
			res.json({found:null,results:'查無資料'});
		}
	});
	db.close();
});


module.exports = router;

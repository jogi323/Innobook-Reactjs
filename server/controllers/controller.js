
//module.exports = function(app){

	var bodyParser = require('body-parser');
	var user_database = require('./connection.js');
	var freiend_database = require('./requestSchema.js');
	var jwt = require('jsonwebtoken');
	var passport = require("passport");
	//var urlencodedParser = bodyParser.urlencoded({ extended: false });
	//app.use(bodyParser.urlencoded());
	var UserRegister = user_database ;
	var friendrequests = freiend_database.friendrequests;
	var post = freiend_database.postschema;
exports.insertUser = function(req, res){
		console.log("insert user called");

		var user_mail = req.body.email;
		console.log(user_mail);
		UserRegister.find({email:user_mail},function(err,docs){
			console.log(docs);
			if( docs[0] == null ){


				var userDetails = new UserRegister({
		            firstName: req.body.firstname,
		            lastName:req.body.lastname,
		            email:req.body.email,
		            password:req.body.pwd,
		            phone:req.body.mobile,
		            gender:req.body.gender,
					profilePic:"",
                   description:"",
				   dob:"",
					hobbies:""
		        });
				console.log(userDetails);
				console.log(req.body);
				userDetails.save(function(err, data){
		            if(err){
		            	console.log("err",err);
						var obj = {
							'message': 'error'
						}
						res.json(err);
					}
					else{
						console.log("success");
					// 	res.json({'firstName':req.body.firstname,
					// 	success:"register success"
					// })
					res.json(1);

						//res.send("hello");
					}
		        });
				//res.render('login');


			}else{
				//res.render('register',{'message':'Usermail already exists try with another'});
				// res.json({'message':'Usermail already exists try with another'});
				res.json(0);
		}

		 });


}

exports.validateUser = function(req, res){
        var username = req.body.username;
		  var password = req.body.password;
		  console.log(req.body.username);
		  UserRegister.find({$and: [{email:username}, {password:password}]}, function (err, user) {
		   console.log(user[0]);
		   if(err){
		    console.log(err);
		   }
		   else if( !user[0] ){
		    //console.log("invalid");
		    res.json({message:'InValid Username and Password'});
		   }else{
			   var secret='123456'
			   var token = jwt.sign(user[0],secret,{

			   });
			   console.log(token);
			req.session.Id=user[0]._id;
			console.log(req.session);
			console.log(req.session.Id);
		    res.json({success: "sucess",session:req.session,user:user[0]});
		   }
        });
}

exports.getUserProfile = function(req,res){
	var email = "jogi3235@gmail.com";

	console.log(req.session);
	console.log(req.session.Id);

	UserRegister.find({'email':email},function(req,docs){
		//console.log(res);
    	//res.json(1);
		res.json({success: "sucess"});
    })
}

exports.updateUser = function(req,resp){
	console.log(req.body.email);

			var userDetails = new UserRegister({
	            firstName: req.body.firstname,
	            lastName:req.body.lastname,
	            email:req.body.email,
	            // password:req.body.pwd,
	            phone:req.body.mobile,
	            gender:req.body.gender,
				// profilePic:req.file.filename,
               description:req.body.description,
			   // dob:req.body.dob,
				hobbies:req.body.hobbies
	        });

UserRegister.find({email: req.body.email},function(error,data){
	if(error){
		throw error
	}else if(data[0] != null){
		userDetails.update(function(err,data){
			if(err)throw err;
			else
			{
				console.log("saved succesfully");
				resp.json({DATA:data});
				var user=req.session.Id;
	console.log(user);
			}
		})
	}
}) ;
}

exports.searchUsers = function(req,res){

	var query = UserRegister.aggregate({$match : {'email': {$ne : useremail}}},{$project : { name: { $concat: [ "$firstName", " ", "$lastName" ] } }});

    query.exec(function (err, someValue) {
    	if(err){
			console.log(err);
		}
        res.json({data:someValue,msg:"success"});
    });
}



exports.individualSearch = function(req,res){
	console.log(req.body.username);
	/*console.log("sessionId",req.sessionId);*/
	UserRegister.find({"_id" : req.params.id},function(err,docs){
    	var email = req.body.username;
    	var user = docs[0].email;
    	//console.log("req.sessionId",req.sessionId);
    	friendrequests.find({$or:[{'send_by':user,'sent_to':email} ,{'sent_by':email,'sent_to':user}]},function(err,data){
    		console.log("*************************",data);
    		if( data == '' ){
    			friend_status = '0';
    		}else if( data[0].accept == '0' ){
    			friend_status = '1'
    		}else if( data[0].accept == '1' ){
    			friend_status = '2'
    		}
			res.json({'mgs':'success','data':docs,'friend_status':friend_status});
			console.log(friend_status);
			console.log(docs);

    	})

    	// console.log("friend_status",friend_status);

    	//friendrequests.close();
    })
}

exports.insertRequest = function(req,res){
	UserRegister.find({"_id" : req.params.id},function(err,docs){
    var email = docs[0].email;
    console.log("data",docs);
    console.log("email",email);
    var data = {
			'sent_by':req.body.sender,
			'sent_to':email,
			'accept':0
			};
	var newRequest = new friendrequests(data);
    newRequest.save(function(err, docs){
    	if(err){
        	console.log("err",err);
			var obj = {
				'message': 'error'
			}
			res.json(err);
		}
		else{
			console.log("success");
			res.json({'mgs':'success'})
		}
    });
});

}


exports.acceptRequest = function(req,res){
	// UserRegister.find({"_id" : req.params.id},function(err,docs){
    // var email = docs[0].email;
	friendrequests.update({$and:[{'sent_to':req.body.username},{'sent_by':req.params.id}]},{$set:{'accept':1}},function(err,docs){
		res.json({'message':'success'})
	// });
});
}


exports.friendsAndRequests = function(req,res){
	console.log("hai friend");
	var req_acc = [];
	friendrequests.find({$and: [{'sent_to':req.body.username }, {'accept':0}]},function(err,accept_records){
    	var req_length = accept_records.length;
    	// console.log("accept_records",accept_records[0].sent_by);
    	for (var x = 0; x < req_length ; x++){
    		var each_req = {};
    		each_req['sent_by'] = accept_records[x].sent_by;
    		req_acc.push(each_req);
    	}

    	var friend_acc = [];
		friendrequests.find({$and:[{'accept':1},{$or:[{'sent_by':req.body.username},{'sent_to': req.body.username}]}]}).exec(function(err, docs) {
    	var friends_count = docs.length;
    	for (var y = 0; y < friends_count ; y++){
    		var each_count = {};
    		if(docs[y].sent_by == req.body.username){
    			each_count['friend_name'] = docs[y].sent_to;
    		}else{
    			each_count['friend_name'] = docs[y].sent_by;
    		}
    		console.log('each_count',each_count);
    		friend_acc.push(each_count);
    	}
	    var friends_acceptance = {};
	    friends_acceptance.accept = req_acc;
	    friends_acceptance.friends = friend_acc;
	    res.json({'msg':'success','friends_acceptance':friends_acceptance});
    })


    })


}

exports.posts = function(req,res){
	console.log(req.body.text);
	var postt = new post({
		post :req.body.text,
		email:req.body.email
	});
	postt.save(function(err,data){
		if(err){
			res.json("err");
		}
		else{
			res.json(data);
		}
	})
}

exports.getposts = function(req,res){
	post.find(function(err,data){
		if(err){
			res.json("err");
		}
		else{
			res.json(data);
		}
	})
}

exports.logOut = function(req,res){
delete req.sessionId;
//   res.redirect('/login');
res.json({message: "logOut"});
}



exports.allData = function(req,res){
	console.log(req.session.Id);
	UserRegister.find(function(err,data){
		if(err)
		throw err;
	// console.log(data);
	res.json(data);
	})
}
exports.updateUser = function(req,res){
   var id=req.body.id;
  UserRegister.update({_id:id},{$set:{firstName:req.body.firstName,lastName:req.body.lastName,description:req.body.description,phone:req.body.phone,hobbies:req.body.hobbies,dob:req.body.dob}},{multi:true},function(err,data){

	if(err){
		throw err;
		res.json({status:0,msg:'Failed to Update'});
	}else{
		res.json({status:1,msg:'updated Successfully'})
	}
})
}

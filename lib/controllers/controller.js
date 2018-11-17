var connection = require('../../Connection');
var jwt    = require('jsonwebtoken');
var express = require('express');
var nodemailer = require('nodemailer');

//var loaded = joins.installPlugins(mongoose);
//const puretext = require('puretext');
  
var app = express();

app.set('superSecret', process.env.JWT_SECRATE); // secret variable

 let transporter = nodemailer.createTransport({
		service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'threesainfoway00@gmail.com', // generated ethereal user
            pass: '25031994M' // generated ethereal password
        }
    });

/* 
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'mhatremayur2520@gmail.com',
        pass: '25031994M'
    }
}); */

	
var opts = {
    //useMongoClient: true,
    autoReconnect: true,
	autoIndex: false, // Don't build indexes
    //reconnectTries: 100, // Never stop trying to reconnect /* Not used for replica set */
    //reconnectInterval: 500, // Reconnect every 500ms  /* Not used for replica set */
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    /*bufferMaxEntries: 0*/
	connectTimeoutMS: 30000,
	socketTimeoutMS: 30000,
	useNewUrlParser: true	
  };

  function encrypt(text) {
	try
	{
		if (text === null || typeof text === 'undefined') { return text; };
		var cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTED_KEY);
		var crypted = cipher.update(text,'utf8','hex');
		crypted += cipher.final('hex');
	}
	catch(err)
	{
		console.log(err)
	}
	return crypted;
} 

	var verificationObject = [{}];
		
		function getvaluesinObject(passedval)
		{
			var charindex = passedval.indexOf("=");
			var strindex = passedval.length;
			var field = passedval.substring(0,charindex).trim();
			var value = passedval.substring(charindex + 1,strindex);
			
			verificationObject[0][field] = value.trim();
			
			
		};
		
  

	/* USER AUTHENTICATION */
	
	exports.authUser= function(userdetails, res) {
		
		
		connection.acquire(function (err, con) {
			con.query("SELECT `id`,`name`,`role`,`pic`,`companyid`,status FROM `users` WHERE `mobile` = ? AND `password` = ?",[userdetails.mobile,userdetails.password], function (err, result) {
				if(err)
				{
					res.send({success:false,message:'Somthing went wrong, Please try again.'});
					con.release();
				}
				else
				{
					if(result.length > 1 || result.length <= 0)
					{
						res.json({success:false,message:'Login cridentials does not matched.'});
					}
					if(result.length == 1)
					{
						if(result[0].status == 1)
						{
							res.send({success:false,message:'Your Login authority is disable, Please contavt your company admin'});
						}
						else
						{
									var payload = {
										userid: result[0].id	
									}
									var token = jwt.sign(payload, app.get('superSecret'), {
										expiresIn: 28800 // expires in 24 hours = 86400
									});
								
										var d = new Date();
										d.setTime(d.getTime() + (0.7*24*60*60*1000));
										var expires = d.toUTCString();
									  
										res.cookie('token', token, { expires: new Date(expires), httpOnly: true });
										res.cookie('username', result[0].name, { expires: new Date(expires), httpOnly: true });
										res.cookie('id', result[0].id, { expires: new Date(expires), httpOnly: true });
										res.cookie('role', result[0].role, { expires: new Date(expires), httpOnly: true });
										res.cookie('companyid', result[0].companyid, { expires: new Date(expires), httpOnly: true });
										res.cookie('profilepic', result[0].pic, { expires: new Date(expires), httpOnly: true });
										
										res.send({success:true,message:'logged in successfully.'});
						}
					}
					
					con.release();
				}
			});
		});
	};   
	
	exports.ForgotPassword = function(userdetails, res) {
		
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
					employees.find({'username':userdetails.username,'contactdetails.email':userdetails.email},{'username':1,'contactdetails.mobile1':1,'contactdetails.email':1}).exec(function (err, result) {
						
				if(err)
				{
					res.send({success:false,message:'Somthing went wrong, Please try again.'});
					mongoose.disconnect();
				}
				else
				{
					if(result.length > 1 || result.length <= 0)
					{
						res.json({success:false,message:'Details does not matched.'});
					}
					if(result.length == 1)
					{
							 		var d = new Date();
									d.setTime(d.getTime() + (0.1*24*60*60*1000));
									var expires = d.toUTCString();
									
									var otp = Math.floor(100000 + Math.random() * 900000);
									var sentotp =  encrypt(String(otp));
									var userid = String(result[0]._id);
									res.cookie('otp',sentotp, { expires: new Date(expires), httpOnly: true });
									res.cookie('_id',userid, { expires: new Date(expires), httpOnly: true });
									
					/* let text = {
					  // To Number is the number you will be sending the text to.
					  toNumber: '+91'+result[0].contactdetails.mobile1,
					  // From number is the number you will buy from your admin dashboard
					  fromNumber: '+14157992515',
					  // Text Content
					  smsBody: 'Your OTP is '+otp+'. \n Please enter it for reset your password for CS portal.\n This OTP is valid for 10 minuts. \n Thanks, \n Admin \n (CS Pvt. Ltd.)',
					  //Sign up for an account to get an API Token
					  //apiToken: '6ampbh'  registered token
					  apiToken: '6ampbh'
				  };
				  
				  puretext.send(text, function (err, response) {
					if(err) console.log(err);
					else {
							res.send({success:true,message:'OTP sent to your registered mobile number.'});
						}
				  });   */
				  
				  const mailOptions = {
						  from: 'mhatremayur2520@gmail.com', // sender address
						  to: result[0].contactdetails.email, // list of receivers
						  subject: 'Forgot Password', // Subject line
						  html: '<h1 style="font-weight:bold;text-align:center;">'+otp+'</h1> <br> <p>Please enter it for reset your password for CS portal.<br> This OTP is valid for 10 minuts. <br><br><br> <div style="float:left;text-align:left;">Thanks, <br> Admin <br> (CS Pvt. Ltd.)</div></p>'// plain text body
						};
						
						
						
						transporter.sendMail(mailOptions, function (err, info) {
							   if(err)
								 console.log(err)
							   else
								 console.log(info);
									res.send({success:true,message:'OTP sent to your registered mobile number.'});
							});
											  
				  
				}
				}
			});
		});
		
	};   
	
	exports.verifyOTP= function(req, res) {
		var cookies = req.headers.cookie.split(';', 5);
		cookies.map(function(value){ getvaluesinObject(value)});
		
		var recievedotp = encrypt(String(req.params.otp))
		if(recievedotp === verificationObject[0].otp)
		{
			res.clearCookie('otp', { path: '/' });
			res.send({status:0});
		}
		else
		{
			res.send({status:1});
		}
	};   
	
	
	exports.ResetPassword= function(req, res) {
		if(req.headers.cookie)
		{
		var cookies = req.headers.cookie.split(';', 5);
		cookies.map(function(value){ getvaluesinObject(value)});
		if(verificationObject[0]._id)
		{
			mongoose.connect(process.env.MONGOLAB_URI,opts).then(
			()=>{
				employees.updateOne({_id:verificationObject[0]._id},{$set: { 'password': req.body.password}}).exec(function (err, result) {
					console.log(err);
					if(err)
					{
						res.send({status:1,message:'Somthing went wrong, Please try again!'});
						mongoose.disconnect();
					}
					else
					{
						res.send({status:0,message:'Password updated successfully, Thank you!'});
						mongoose.disconnect();
					}
				});
			});
			}
			else
		{
			res.send({status:1,message:'Somthing went wrong, Please generate OTP again'});
		}
		}
		else
		{
			res.send({status:1,message:'Somthing went wrong, Please generate OTP again'});
		}
	};   
	
	
	/* TERMS AND CONDITIONS */
	
	
	
	
	
	exports.ListTermsNCondtions= function(req, res) {
		if(req.decoded.success == true)
		{
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
			termsnconditions.find({}).populate('createdby','username').exec(function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					mongoose.disconnect();
				}
				else
				{
					res.send(result);
					mongoose.disconnect();
				}
			});
		});
		}
	};   
	
	exports.DeleteTermCondition= function(req, res) {
		if(req.decoded.success == true)
		{
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
			var termid = req.params.termid;
			termsnconditions.deleteOne({_id:termid}).exec(function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					mongoose.disconnect();
				}
				else
				{
					res.send({status:0,message:'Record deleted successfully!'});
					mongoose.disconnect();
				}
			});
		});
		}
	};   
	
	exports.getTermsDetails= function(req, res) {
		if(req.decoded.success == true)
		{
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
			var termid = req.params.termid;
			termsnconditions.find({_id:termid}).exec(function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					mongoose.disconnect();
				}
				else
				{
					res.send(result);
					mongoose.disconnect();
				}
			});
		});
		}
	};   
	
	exports.SaveTermsDetails= function(req, res) {
		if(req.decoded.success == true)
		{
		var tearmsDetails = req.body;
		var description = tearmsDetails.description ;
		tearmsDetails.createdby = req.Loggedinuser.id;
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
			var tearmsdetails = new termsnconditions(tearmsDetails);
			if(tearmsDetails._id)
			{
				termsnconditions.update({ _id: tearmsDetails._id }, tearmsDetails,{ multi: true }, function(err) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					mongoose.disconnect();
				}
				else
				{
					res.send({status:0,message:'Record updated successfully!'});
					mongoose.disconnect();
				}
			});
			}
			else
			{
				tearmsdetails.save(function(err,result) {
					if(err)
					{
						res.send({status:1,message:'Somthing went wrong, Please try again!'});
						mongoose.disconnect();
					}
					else
					{
						res.send({status:0,message:'Record inserted successfully!'});
						mongoose.disconnect();
					}
				});
			}
		});
		}
	};   
	

	
	exports.RemoveTermDescriptionPoint= function(req, res) {
		if(req.decoded.success == true)
		{
		var tearmsDetailsid = req.params.termdetailsid;
		var termmasterid = req.params.termmasterid;
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
			termsnconditions.update( 
				{ _id: termmasterid },
				{ $pull: { description : { _id : tearmsDetailsid } } },
				{ safe: true },
				function removeConnectionsCB(err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					mongoose.disconnect();
				}
				else
				{
					res.send({status:0,message:'Record deleted successfully!'});
					mongoose.disconnect();
				}
			});
		});
		}
	};   
	
	/* TERMS AND CONDITIONS */
	

	
	/* COMPANY DETAILS */
	
	
	
	exports.getCoockies= function(req, res) {
		res.send(req.Loggedinuser)
	};
	
	exports.SignOut= function(req, res) {
		if(req.decoded.success == true)
		{
			res.clearCookie('profilepic');
			res.clearCookie('username');
			res.clearCookie('id');
			res.clearCookie('token');
			res.clearCookie('role');
			res.clearCookie('companyid');
			res.send({status:true,message:'Successfully Sign out'});
		}
		else
		{
			res.send({status:true,message:'Token already expires'});
		}
	};
	
	
	exports.GetUserRole = function(req, res) {
		if(req.decoded.success == true)
		{
				res.json(['Admin','Staff']);
		}
		else
		{
			res.send({status:true,message:'Token expires please login again'});
		}
	};
	
	
	exports.ListCompanies= function(req, res) {

		if(req.decoded.success == true)
		{
			connection.acquire(function (err, con) {
			con.query("SELECT `name`,`id`,`owner`,`mobile1`,`approval`,(CASE WHEN approval = 1 THEN 'Approved' WHEN approval = 2 THEN 'Dismiss' ELSE 'Pending' END) as approvaltxt,(CASE WHEN approval = 1 THEN 'green' WHEN approval = 2 THEN 'red' ELSE 'yellow' END) as aprvlclr FROM `companymaster` ORDER BY id DESC", function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
		}
	};   
	
	exports.GetCompaniesDetails = function(req, res) {
		if(req.decoded.success == true)
		{
			connection.acquire(function (err, con) {
			con.query("SELECT * FROM `companymaster` WHERE id = "+req.params.compid, function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
		}
	};   
	
	exports.SaveCompanyDetails= function(req, res) {
			connection.acquire(function (err, con) {
				if(req.body[0].id)
				{
					var sql = 'UPDATE companymaster SET ? WHERE id = ?';
					var operationarray = [req.body[0],req.body[0].id];
					var successmsg = "Record Updated Successfully";
				}
				if(!req.body[0].id)
				{
					var sql = 'INSERT INTO companymaster SET ?';
					var operationarray = req.body[0];
					var successmsg = "New Record Inserted Successfully";
					
				}
			con.query(sql,operationarray, function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					if(!req.body[0].id)
					{
						var companyid = result.insertId;
						
						var passwordtxt = "";
						var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
						for(var i = 0; i < 6; i++) {
							passwordtxt += possible.charAt(Math.floor(Math.random() * possible.length));
						}
						
						
						
						con.query('INSERT INTO users SET ?',{name:req.body[0].owner,role:'Admin',mobile:req.body[0].mobile1,email:req.body[0].email,companyid:companyid,password:passwordtxt}, function (err, result) {
							if(err)
							{
								res.send({status:1,message:'Somthing went wrong, Please try again!'});
								con.query('DELETE FROM `companymaster` WHERE id = '+companyid, function (err, result) {
									if(err)
									{
										res.send({status:1,message:'Somthing went wrong, Please try again!'});
										con.release();
									}
									else
									{
										
										  res.send({status:1,message:'Somthing went wrong, Please try again!'});
										con.release();
										
									}
								});
							}
							else
							{
								const mailOptions = {
									  from: 'threesainfoway00@gmail.com', // sender address
									  to: req.body[0].email, // list of receivers
									  subject: 'New Registration', // Subject line
									  html: 'Dear '+req.body[0].owner+'<br><br><br><h1 style="font-weight:bold;text-align:center;">'+passwordtxt+'</h1> <br> <p>enter this as a  password for Rasoi food delivary app.<br><br><br><br> <div style="float:left;text-align:left;">Thanks, <br> Admin <br> (Rasoi food dilevary Pvt. Ltd.)</div></p>'// plain text body
									};
									
									
						
									transporter.sendMail(mailOptions, function (err, info) {
										   if(err)
											 console.log(err)
										   else
											 console.log(info);
										 res.send({status:1,message:'Company Details Inserted Successfully , Pasword sent to admin user for this company via email'});
										con.release();
										});
											  
										
										
							}
						});
						
						
						
					}
					else
					{
						res.send({status:1,message:successmsg});
						con.release();
					}
				}
			});
		});
		
	};   
		
	
	
	
	/* COMPANY DETAILS */
	
	
	
	exports.ListCompanies= function(req, res) {

		if(req.decoded.success == true)
		{
			if(req.Loggedinuser.role === 'Superadmin')
				{
					connection.acquire(function (err, con) {
						con.query("SELECT `name`,`id`,`owner`,`mobile1`,`approval`,(CASE WHEN approval = 1 THEN 'Approved' WHEN approval = 2 THEN 'Dismiss' ELSE 'Pending' END) as approvaltxt,(CASE WHEN approval = 1 THEN 'green' WHEN approval = 2 THEN 'red' ELSE 'yellow' END) as aprvlclr FROM `companymaster` ORDER BY id DESC", function (err, result) {
							if(err)
							{
								res.send({status:1,message:'Somthing went wrong, Please try again!'});
								con.release();
							}
							else
							{
								res.send(result);
								con.release();
							}
						});
					});
				}
			}
	};   
	
	exports.GetCompaniesDetails = function(req, res) {
		if(req.decoded.success == true)
		{
			connection.acquire(function (err, con) {
			con.query("SELECT * FROM `companymaster` WHERE id = "+req.params.compid, function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
		}
	};   
	
	
	exports.GetUserDetails = function(req, res) {
		if(req.decoded.success == true)
		{
			connection.acquire(function (err, con) {
			con.query("SELECT * FROM `users` WHERE id = "+req.params.userid, function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
		}
	};   
	
	
	
	exports.DisableUserDetails = function(req, res) {
		if(req.decoded.success == true)
		{
			connection.acquire(function (err, con) {
			con.query("UPDATE users SET status = CASE WHEN status = 1 THEN 0 ELSE 1 END WHERE id =  "+req.params.userid, function (err, result) {
				if(err)
				{
					res.send({status:1,type:'error',title:'Oops...',message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					res.send({status:0,type:'success',title:'Good!',message:'User is Disable Now!'});
					con.release();
				}
			});
		});
		}
	};   
	
	exports.DeleteUserDetails = function(req, res) {
		if(req.decoded.success == true)
		{
			connection.acquire(function (err, con) {
					
			con.query("SELECT id,(SELECT COUNT(*) FROM ordermaster WHERE ordermaster.oppointeduser = users.id) as ordercounts FROM `users` WHERE id = "+req.params.userid, function (err, result) {
				if(err)
				{
					res.send({status:1,type:'error',title:'Oops...',message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					
					if(result[0].ordercounts >= 0)
					{
						res.send({status:2,type:'warning',title:'You cannot delete this user',message:'This user oppointed for orders,Are you want to Disable This User'});
						con.release();	
					}
					else
					{
						con.query("DELETE FROM `users` WHERE `id` = "+req.params.userid, function (err, result) {
							if(err)
							{
								res.send({status:1,type:'error',title:'Oops...',message:'Somthing went wrong, Please try again!'});
								con.release();
							}
							else
							{
								res.send({status:0,type:'success',title:'Good!',message:'Record deleted successfully!'});
								con.release();
							}
						});
					}
				}
			});
		});
		}
	};   
	
	
	exports.ListUsers = function(req, res) {
		if(req.decoded.success == true)
		{
			connection.acquire(function (err, con) {
				if(req.Loggedinuser.role === 'Superadmin')
				{
					var sql = 'SELECT `id`,`name`,`role`,`mobile`,(SELECT companymaster.name FROM companymaster WHERE companymaster.id = users.companyid) as companyname,(CASE WHEN status = 0 THEN "Active" ELSE "Disable" END) as statustxt,(CASE WHEN status = 0 THEN "green" ELSE "red" END) as stsclr FROM `users`';
				}
				if(req.Loggedinuser.role === 'Admin')
				{
					var sql = 'SELECT `id`,`name`,`role`,`mobile`,(CASE WHEN status = 0 THEN "Active" ELSE "Disable" END) as statustxt,(CASE WHEN status = 0 THEN "green" ELSE "red" END) as stsclr FROM `users` WHERE `companyid` = '+req.Loggedinuser.companyid
				}
				
			 con.query(sql, function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
			}); 
		}
	};   
	
	exports.SaveUserDetails= function(req, res) {
			connection.acquire(function (err, con) {
				
				var passwordtxt = "";
				
				if(req.body[0].id)
				{
					var sql = 'UPDATE users SET ? WHERE id = '+req.body[0].id;
					var operationarray = [req.body[0]];
					var successmsg = "Record Updated Successfully";
				}
				if(!req.body[0].id)
				{
					
					
						var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
						for(var i = 0; i < 6; i++) {
							passwordtxt += possible.charAt(Math.floor(Math.random() * possible.length));
						}
						
					
					var sql = 'INSERT INTO users SET ?';
					var operationarray = req.body;
					console.log(operationarray[0])
					operationarray[0].password = passwordtxt;
					operationarray[0].companyid = req.Loggedinuser.companyid;
					var successmsg = "New Record Inserted Successfully";
					
				}
			con.query(sql,operationarray[0], function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({status:1,type:'error',title:'Oops...',message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					if(!req.body[0].id)
					{
					
						
						
						
						
						
								const mailOptions = {
									  from: 'threesainfoway00@gmail.com', // sender address
									  to: req.body[0].email, // list of receivers
									  subject: 'New Registration', // Subject line
									  html: 'Dear '+req.body[0].name+'<br><br><br><h1 style="font-weight:bold;text-align:center;">'+passwordtxt+'</h1> <br> <p>enter this as a  password for Rasoi food delivary app.<br><br><br><br> <div style="float:left;text-align:left;">Thanks, <br> Admin <br> (Rasoi food dilevary Pvt. Ltd.)</div></p>'// plain text body
									};
									
									
						
									transporter.sendMail(mailOptions, function (err, info) {
										   if(err)
											 console.log(err)
										   else
											 console.log(info);
										 res.send({status:0,type:'success',title:'Good!',message:'User Details Inserted Successfully , Pasword sent to Saved user for this company via email'});
										con.release();
										});
											  
						
					}
					else
					{
						res.send({status:0,type:'success',title:'Good!',message:successmsg});
						con.release();
					}
				}
			});
		});
		
	};   
		
	
	
	
	/* COMPANY DETAILS */
	
	
	/* OFFERS */
	
	exports.ListOffers = function(req, res) {
		if(req.decoded.success == true)
		{
			connection.acquire(function (err, con) {
				if(req.Loggedinuser.role === 'Superadmin')
				{
					var sql = 'SELECT `id`,`name`,`offercode`,`startdate`,`enddate`,`banner`,(SELECT companymaster.name FROM companymaster WHERE companymaster.id = offers.companyid) as companyname,createdby,(SELECT users.role FROM users WHERE users.id = offers.createdby) as createdbyrole FROM `offers`';
				}
				if(req.Loggedinuser.role === 'Admin')
				{
					var sql = 'SELECT `id`,`name`,`offercode`,`startdate`,`enddate`,`banner`,(SELECT companymaster.name FROM companymaster WHERE companymaster.id = offers.companyid) as companyname,createdby,(SELECT users.role FROM users WHERE users.id = offers.createdby) as createdbyrole FROM `offers` WHERE `companyid` = '+req.Loggedinuser.companyid+' OR companyid IS NULL '
				}
				
			 con.query(sql, function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
			}); 
		}
	};   
	
	
	exports.GetOfferDetails = function(req, res) {
		if(req.decoded.success == true)
		{
			connection.acquire(function (err, con) {
			 con.query('SELECT * FROM `offers` WHERE `id` = '+req.params.offerid, function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
			}); 
		}
	};   
	
	
	
	exports.SaveOffers = function(req, res) {
		if(req.decoded.success == true)
		{	
	
					if(req.file)
						var filename = req.file.filename;
					else
						var filename = req.body.offersDetails.banner;
				
				if(req.Loggedinuser.companyid === 'j%3Anull')
					req.Loggedinuser.companyid = null;
	
			if(req.body.offersDetails.id)
			{
				var sql = "UPDATE `offers` SET `name`= '"+req.body.offersDetails.name+"',`terms`= '"+req.body.offersDetails.terms+"',`offercode`= '"+req.body.offersDetails.offercode+"',`banner`= '"+filename+"',`startdate`= '"+req.body.offersDetails.startdate+"',`enddate`= '"+req.body.offersDetails.enddate+"' WHERE id = "+req.body.offersDetails.id;
				var successmsg = "Record Updated Successfully";
			}
			else
			{
				var sql ="INSERT INTO `offers`(`name`, `terms`, `offercode`, `banner`, `startdate`, `enddate`, `companyid`, `createdby`) VALUES ('"+req.body.offersDetails.name+"','"+req.body.offersDetails.terms+"','"+req.body.offersDetails.offercode+"','"+filename+"','"+req.body.offersDetails.startdate+"','"+req.body.offersDetails.enddate+"',"+req.Loggedinuser.companyid+","+req.Loggedinuser.id+")";
				var successmsg = "New Record Inserted Successfully";
			}
			
			 connection.acquire(function (err, con) {
			 con.query(sql, function (err, result) {
				 console.log(err);
				if(err)
				{
					res.send({status:1,type:'error',title:'Oop...',message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					res.send({status:0,type:'success',title:'Good!',message:successmsg});
					con.release();
				}
			});
			});  
		}
	};   
	
		
	
	/* OFFERS */
	
	
	

	exports.CheckFisrTimeLogin = function(req, res) {
		if(req.decoded.success == true)
		{
			connection.acquire(function (err, con) {
			con.query("SELECT firstlogin FROM `users` WHERE id = "+req.Loggedinuser.id, function (err, result) {
				if(err)
				{
					res.send({status:1,type:'error',title:'Oops...',message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
		}
	};   
	
	exports.setnewPassword = function(req, res) {
		if(req.decoded.success == true)
		{
			connection.acquire(function (err, con) {
			con.query("UPDATE users SET password = '"+req.body.password+"' ,firstlogin = 1 WHERE id =  "+req.Loggedinuser.id, function (err, result) {
				if(err)
				{
					res.send({status:1,type:'error',title:'Oops...',message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					res.send({status:0,type:'success',title:'Good!',message:'Password updated successfully'});
					con.release();
				}
			});
		});
		}
	};   
	
	
	
	exports.getUserProfile = function(req, res) {
		if(req.decoded.success == true)
		{
			connection.acquire(function (err, con) {
			con.query("SELECT id,`name`,`role`,`mobile`,`email`,`pic`,(SELECT companymaster.name FROM companymaster WHERE companymaster.id = users.companyid) as companyname,companyid,(SELECT companymaster.address FROM companymaster WHERE companymaster.id = users.companyid) as companyaddress FROM `users` WHERE `id` = "+req.Loggedinuser.id, function (err, result) {
				if(err)
				{
					res.send({status:1,type:'error',title:'Oops...',message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
		}
	};   
			var geocoder = require('geocoder');
			
	exports.ConvertAddressFromlatlang = function(req, res) {
		if(req.decoded.success == true)
		{
			console.log(req.body)
				geocoder.reverseGeocode( req.body.lat, req.body.lang, function ( err, data ) {
			  // do stuff with data
			  console.log(data);
			}, { key: "AIzaSyBPLnAd1S4YMJwYEzJfnHAmIQSAeocHsnE"});
		}
	};   
	
	
	exports.UpdateUserProfile = function(req, res) {
		if(req.decoded.success == true)
		{
			console.log(req.body)
			console.log(req.file)
			if(req.file)
			{
				var filename = req.file.filename
			}else{
				var filename = req.body.userdetails.pic;
			}
				connection.acquire(function (err, con) {
			con.query('UPDATE `users` SET `name`= "'+req.body.userdetails.name+'",`email`= "'+req.body.userdetails.email+'",`pic`= "'+filename+'" WHERE `id` = '+req.body.userdetails.id, function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({status:1,type:'error',title:'Oops...',message:'Somthing went wrong, Please try again!'});
					con.release();
				}
				else
				{
					if(req.Loggedinuser.role == 'Admin')
					{
					con.query('UPDATE companymaster SET `address` = "'+req.body.userdetails.companyaddress+'", `lat` = '+req.body.userdetails.lat+', `lang` = '+req.body.userdetails.lan+' WHERE id =  '+req.body.userdetails.companyid, function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({status:1,type:'error',title:'Oops...',message:'Somthing went wrong Address does not change, Please try again!'});
					con.release();
				}
				else
				{
					res.send({status:0,type:'success',title:'Good!',message:'Profile updated successfully'});
					con.release();
				}
				});
				}
					else
					{
						res.send({status:0,type:'success',title:'Good!',message:'Profile updated successfully'});
						con.release();
					}
				}
			});
		});
		}
	};   
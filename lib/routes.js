var  cs = require('./controllers/controller');
var  security = require('./controllers/security');
const multer = require('multer');
var path = require('path');
	const dir = './app/uploads';
	
let storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, dir);
		},
		filename: (req, file, cb) => {
			cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
		}
	});
	
	let upload = multer({storage: storage});

module.exports = {

    configure: function (app) {
			app.post('/api/authUser',function (req, res) {
				cs.authUser(req.body,res);
			});
			
			app.post('/api/ResetPassword',function (req, res) {
				cs.ResetPassword(req,res);
			});
		
			app.post('/api/ForgotPassword',function (req, res) {
				cs.ForgotPassword(req.body,res);
			});
			
			app.get('/api/verifyOTP/:otp',function (req, res) {
				cs.verifyOTP(req,res);
			});
			

			
			

			
			app.get('/api/getUserProfile/', function (req, res) {
				security(req,res);cs.getUserProfile(req, res);
			});
			app.get('/api/SignOut/', function (req, res) {
				security(req,res);cs.SignOut(req, res);
			});
			
			app.get('/api/GetUserRole/', function (req, res) {
				security(req,res);cs.GetUserRole(req, res);
			});
			
			
			app.get('/api/getCoockies/', function (req, res) {
				security(req,res);cs.getCoockies(req, res);
			});
			
			app.get('/api/ListCompanies/', function (req, res) {
				security(req,res);cs.ListCompanies(req, res);
			});
			
			app.get('/api/GetCompaniesDetails/:compid', function (req, res) {
				security(req,res);cs.GetCompaniesDetails(req, res);
			});
			
			app.post('/api/SaveCompanyDetails/', function (req, res) {
			cs.SaveCompanyDetails(req, res);
			});
			
			
			app.post('/api/SaveUserDetails/', function (req, res) {
			security(req,res);cs.SaveUserDetails(req, res);
			});
		
    }
};
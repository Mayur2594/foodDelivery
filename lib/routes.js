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
				if(req.headers.cookie)
				{security(req,res);cs.getCoockies(req, res);}
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
			
			
			app.get('/api/ListUsers/', function (req, res) {
			security(req,res);cs.ListUsers(req, res);
			});
			
			app.get('/api/GetUserDetails/:userid', function (req, res) {
			security(req,res);cs.GetUserDetails(req, res);
			});
		
			app.delete('/api/DeleteUserDetails/:userid', function (req, res) {
			security(req,res);cs.DeleteUserDetails(req, res);
			});
		
			app.get('/api/DisableUserDetails/:userid', function (req, res) {
			security(req,res);cs.DisableUserDetails(req, res);
			});
		
			app.post('/api/SaveUserDetails/', function (req, res) {
			security(req,res);cs.SaveUserDetails(req, res);
			});
		
		
			app.get('/api/CheckFisrTimeLogin/', function (req, res) {
			security(req,res);cs.CheckFisrTimeLogin(req, res);
			});
		
			app.post('/api/setnewPassword/', function (req, res) {
			security(req,res);cs.setnewPassword(req, res);
			});
			
			/* OFFERS */
			
			app.get('/api/ListOffers/', function (req, res) {
			security(req,res);cs.ListOffers(req, res);
			});
			
			app.get('/api/GetOfferDetails/:offerid', function (req, res) {
			security(req,res);cs.GetOfferDetails(req, res);
			});
			
			app.post('/api/SaveOffers', upload.single('file'),function (req, res) {
            security(req,res);cs.SaveOffers(req, res);
			});
			
			
			
			/* OFFERS */
		
			app.post('/api/setnewPassword/', function (req, res) {
			security(req,res);cs.setnewPassword(req, res);
			});
		
			app.post('/api/ConvertAddressFromlatlang/', function (req, res) {
			security(req,res);cs.ConvertAddressFromlatlang(req, res);
			});
		
			app.get('/api/getUserProfile/', function (req, res) {
			security(req,res);cs.getUserProfile(req, res);
			});
			
			app.post('/api/UpdateUserProfile', upload.single('file'),function (req, res) {
            security(req,res);cs.UpdateUserProfile(req, res);
			});
    }
};
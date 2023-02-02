const User = require("../models/tenantModel");
const Recruiter = require("../models/flatOwnerModel");
const handlerFactory = require("./handlerFactory");

/***********SIGNUP**********/
// POST -> /api/v1/users/signup
exports.signupUser = handlerFactory.signup(User);
// POST -> /api/v1/recruiter/signup
exports.signupRecruiter = handlerFactory.signup(Recruiter);

/***********LOGIN**********/
// POST -> /api/v1/users/login
exports.loginUser = handlerFactory.login(User);
// POST -> /api/v1/recruiter/login
exports.loginRecruiter = handlerFactory.login(Recruiter);

/***********FORGOT PASSWORD**********/
// POST -> /api/v1/users/forgotPassword
exports.forgotPasswordUser = handlerFactory.forgotPassword(User, "tenant");
// POST -> /api/v1/recruiter/forgotPassword
exports.forgotPasswordRecruiter = handlerFactory.forgotPassword(
	Recruiter,
	"owner"
);

/***********RESET PASSWORD**********/
// POST -> /api/v1/users/resetPassword
exports.resetPasswordUser = handlerFactory.resetPassword(User);
// POST -> /api/v1/recruiter/resetPassword
exports.resetPasswordRecruiter = handlerFactory.resetPassword(Recruiter);

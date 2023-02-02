const Tenant = require("../models/tenantModel");
const FlatOwner = require("../models/flatOwnerModel");
const handlerFactory = require("./handlerFactory");

/***********SIGNUP**********/
// POST -> /api/v1/tenants/signup
exports.signupTenant = handlerFactory.signup(Tenant);
// POST -> /api/v1/flatOwners/signup
exports.signupFlatOwner = handlerFactory.signup(FlatOwner);

/***********LOGIN**********/
// POST -> /api/v1/tenants/login
exports.loginTenant = handlerFactory.login(Tenant);
// POST -> /api/v1/flatOwners/login
exports.loginFlatOwner = handlerFactory.login(FlatOwner);

/***********FORGOT PASSWORD**********/
// POST -> /api/v1/tenants/forgotPassword
exports.forgotPasswordTenant = handlerFactory.forgotPassword(Tenant, "tenant");
// POST -> /api/v1/flatOwners/forgotPassword
exports.forgotPasswordFlatOwner = handlerFactory.forgotPassword(
	FlatOwner,
	"owner"
);

/***********RESET PASSWORD**********/
// POST -> /api/v1/tenants/resetPassword
exports.resetPasswordTenant = handlerFactory.resetPassword(Tenant);
// POST -> /api/v1/flatOwners/resetPassword
exports.resetPasswordFlatOwner = handlerFactory.resetPassword(FlatOwner);

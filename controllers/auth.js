const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const {name, email, role, password} = req.body;

  const user = await User.create({
    name,
    email,
    role,
    password
  });

  // Create token using the methode defined on the model
  const token = user.getSignedJwt();

  res.status(200).json({
    success: true,
    token
  });
});
// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const {name, email, password} = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please add your email and password', 400));
  }

  // Check for user
  const user = await User.findOne({email}).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Match entered password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create token using the methode defined on the model
  const token = user.getSignedJwt();

  res.status(200).json({
    success: true,
    token
  });
});

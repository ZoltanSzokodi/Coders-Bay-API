const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Register user
// @route   GET /api/v1/auth/register
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

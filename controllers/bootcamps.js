// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'GET all bootcamps'
  });
};
// @desc    Get a single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `GET bootcamp with id ${req.params.id}`
  });
};
// @desc    Create a new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.postBootcamp = async (req, res, next) => {
  res.status(201).json({
    success: true,
    msg: 'CREATED bootcamp'
  });
};
// @desc    Modify a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `MODIFIED bootcamp with id ${req.params.id}`
  });
};
// @desc    Remove a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `DELETED bootcamp with id ${req.params.id}`
  });
};

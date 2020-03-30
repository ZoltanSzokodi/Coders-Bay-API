const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Copy req.query so we don't change the original
  const requestQuery = {...req.query};

  // fields to exclude from the copy of req.query (the original will still hold them)
  // we need to remove them because mongoose will try to match them with actuall fields in the document
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // loop over removeFields and delete them from requestQuery
  removeFields.forEach(param => delete requestQuery[param]);

  // extract the query params (after the ? in the URL) and stringify
  let queryStr = JSON.stringify(requestQuery);

  // add $ sign to params (create operators -> gt, gte, lt etc...)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // parse it back to json
  query = model.find(JSON.parse(queryStr));

  // select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // Execute the query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };

  next();
};

module.exports = advancedResults;

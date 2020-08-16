const error = (err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    msg: 'Something went wrong, try again later'
  });
};

module.exports = error;

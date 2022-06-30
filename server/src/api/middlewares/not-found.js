const notFoundMiddleware = (req, res, next) => {
  res.status(404).send('Not Found');
};

export default notFoundMiddleware;

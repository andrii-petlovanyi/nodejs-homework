const reqValidation = (schema) => {
  const func = async (req, res, next) => {
    const body = req.body;

    if (!Object.keys(body).length) {
      next(res.status(400).json({ message: "All fields is required" }));
    }

    const { error } = schema.validate(body);

    if (error) {
      next(res.status(400).json({ message: error.message }));
    }

    next();
  };

  return func;
};

export { reqValidation };

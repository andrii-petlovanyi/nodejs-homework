class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParamsError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export { ValidationError, WrongParamsError };

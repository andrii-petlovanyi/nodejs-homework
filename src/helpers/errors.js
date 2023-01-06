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

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

class BadCredentials extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

export {
  ValidationError,
  WrongParamsError,
  NotAuthorizedError,
  ConflictError,
  BadCredentials,
};

class PhoneBookError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends PhoneBookError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParamsError extends PhoneBookError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class AccessDeniedError extends PhoneBookError {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

class NotAuthorizedError extends PhoneBookError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class ConflictError extends PhoneBookError {
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
  PhoneBookError,
  AccessDeniedError,
};

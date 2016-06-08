module.exports = {
    getLocationBase,
    isValidationError,
    getValidationErrorMessage,
  };

function getLocationBase(req, id) {
  return `${req.protocol}://${req.get('Host')}${req.url}/${id}`;
}

function isValidationError(err) {
  return err.name === 'ValidationError';
}

function getValidationErrorMessage(err) {
  var message = err.message;
  for (let field in err.errors) {
    message += ` ${err.errors[field].message}`;
  }
  return message;
}



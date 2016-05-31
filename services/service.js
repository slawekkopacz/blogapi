module.exports = function (Model) {

  function getAll(callback) {
    find({}, function (err, result) {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }

  function getById(id, callback) {
    findOne({ _id: id }, function (err, result) {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }

  function find(filter, callback) {
    Model.find(filter).exec(function (err, result) {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }

  function findOne(filter, callback) {
    Model.findOne(filter).exec(function (err, result) {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }

  function save(obj, callback) {
    var document = new Model(obj);
    document.save(function (err, savedDocument) {
      if (err) {
        return callback(err);
      }
      callback(null, savedDocument);
    });
  }

  return {
    getAll: getAll,
    getById: getById,
    save: save,
    isValidModelId: id => Model.isValidId(id),
  }
}
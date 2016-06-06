var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  //_id: mongoose.Types.ObjectId,
  title: String,
  body: String,
  postedDate: Date,
});

//TODO[sk]: move to base?
postSchema.methods.toResponseObject = function() {
  var obj = this.toObject({ virtuals: true });
  delete obj._id;
  delete obj.__v;
  return obj;
};

postSchema.statics.isValidId = id => mongoose.Types.ObjectId.isValid(id);

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
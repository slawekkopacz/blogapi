var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  //_id: mongoose.Types.ObjectId,
  title: String,
  body: String,
  postedDate: Date,
});

postSchema.statics.isValidId = id => mongoose.Types.ObjectId.isValid(id);

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
const mongoose = require('mongoose');

const replyCommentSchema = new mongoose.Schema({
    username: String,
    comment: String,
    displayPic: String,
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
}, { timestamps: true })

const commentSchema = new mongoose.Schema({
    
  // ... additional comment fields
  
  replies: [replyCommentSchema]
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
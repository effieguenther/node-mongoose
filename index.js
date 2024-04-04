const mongoose = require('mongoose');
const Comment = require('./models/comment');

const url = 'mongodb://localhost:27017/test';
const connect = mongoose.connect(url, {
    //don't worry about these, they are here because of recent updates to mongodb
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(async () => {
    try {
        const newComment = new Comment({});
        await newComment.save();
        console.log('created new comment', newComment);
        const id = newComment._id.toString();
        await Comment.findOneAndUpdate(
            { _id: id }, 
            { 
                $push: { 
                    replies: {
                        username: "username",
                        comment: "comment",
                        displayPic: "image",
                        commentId: id
                    } 
                } 
            }
        );

        const updatedComment = await Comment.findById(id);
        console.log('updated comment:', updatedComment);

    } catch (err) {
        console.error('Error inserting comment:', err);
    }
});
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    annonymous: {
        type: Boolean,
        default: false
    },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
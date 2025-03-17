import Post from "../models/post_model.js";

export const newPost = (req,res) => {
    const {content,annonymous,userid} = req.body;
    if(annonymous)
        userid = null;
    {
        const post = new Post({
            content: content,
            User: userid,
            annonymous: annonymous,
        });
        post.save()
        .then((post) => {
            res.status(201).json(post);
        })
        .catch((err) => {
            res.status(400).json({error: err});
        });
    }

};


export const allPosts = (req,res) => {
    Post.find()
    .populate("User", "email")
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch((err) => {
        res.status(400).json({error: err});
    });
}

 

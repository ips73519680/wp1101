import express from 'express'
import post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)


router.get('/allPosts', async function (req, res) {
    const posts = await post.find()
    if (posts.length === 0) {
        console.log("not!")

        res.status(406).send({
            "message": "error",
            "data": null
        })
    }
    else {
        console.log("good!")

        {
            for (let i = 0; i < posts.length; i++) {
                posts.sort(function (x, y) {
                    return y.timestamp - x.timestamp;
                })
            }
        }
        res.status(200).send({
            "message": "success",
            "data": posts
        })
    }
});
// TODO 3-(1): create the 2nd API (/api/postDetail)

router.get('/postDetail', async function (req, res) {
    const { queryString } = req.query

    const data = await post.find(queryString)

    if (posts.length === 0) {
        console.log("not!")
        res.status(406).send({
            "message": "error",
            "post": null
        })
    }
    else {

        res.status(200).send({
            "message": "success",
            "post": data
        })
    }
})
// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async function (req, res) {
    const { postId,
        title,
        content,
        timestamp } = req.body
    if (posts.length === 0) {
        res.status(406).send({
            "message": "error",
            "post": null
        })
    }
    else {
        const newPost = new post({
            postId,
            title,
            content,
            timestamp
        })
        console.log("create new post");
        await newPost.save();
        res.status(200).send({
            "message": "success",
        })
    }
})
// TODO 5-(1): create the 4th API (/api/post)

export default router
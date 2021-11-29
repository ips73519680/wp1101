
import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

const saveCard = async (name, subject, score, res) => {
    const existing = await ScoreCard.findOne({ name, subject })
    if (existing) {
        console.log("find!");

        try {
            await ScoreCard.updateOne({ name, subject }, score)
        } catch (e) { console.log(e); }
        res.json({
            message: `Updating (${name}, ${subject}, ${score})`,
            card: { name, subject, score }
        })
    }
    else {
        console.log("new data!");
        const newScoreCard = new ScoreCard({ name, subject, score })
        console.log("create new card");
        await newScoreCard.save();

        res.json({
            message: `Adding (${name}, ${subject}, ${score})`,
            card: { name, subject, score }
        })
    }
}



const deleteDB = async () => {
    try {
        await User.deleteMany({});
        console.log("Database deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
};

router.post('/create-card', async function (req, res) {
    const { name, subject, score } = req.body
    saveCard(name, subject, score, res);
});

router.delete('/clear-db', async function (req, res) {
    try {
        await ScoreCard.deleteMany({});
        res.json({
            message: "Database deleted"
        })
    } catch (e) { throw new Error("Database deletion failed"); }
})

router.get('/query-cards', async function (req, res) {
    const { queryType, queryString } = req.query
    const query = {}
    query[queryType] = queryString
    const data = await ScoreCard.find(query)
    console.log(query);
    if (data.length === 0) {
        console.log("not!")
        res.json({
            message: `${queryType} (${queryString}) not found!`,
            messages: undefined
        })
    }
    else {
        console.log("here!");
        const messages = data.map((item) => `${item.name}, ${item.subject}, ${item.score}`)
        res.json({
            messages: messages
        })
    }

})

router.get('/query-card-firstrender', async function (req, res) {

    const { queryType, queryString } = req.query
    const query = {}
    query[queryType] = queryString
    const data = await ScoreCard.find()
    if (data.length === 0) {
        console.log("not!")
        res.json({
            message: `${queryType} (${queryString}) not found!`,
            messages: undefined
        })
    }
    else {
        const messages = data.map((item) => `${item.name}, ${item.subject}, ${item.score}`)
        res.json({
            messages: messages
        })
    }

})
export default router;


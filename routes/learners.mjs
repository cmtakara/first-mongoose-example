import express from 'express';
const router = express.Router();
import Learner from '../models/learners.mjs';

// define a seed route
router.get('/seed', async (req, res) => {
    try {
        await Learner.create([
            {
                name: 'Frodo',
                enrolled: true,
                year: 2024
            },
            {
                name: 'Spongebob',
                enrolled: true,
                year: 2020
            },
            {
                name: 'Hermione',
                enrolled: true,
                year: 2023
            }
        ])
        res.send('success').status(200);
    } catch (err) {
        res.status(400).send(err);
    }
})


router.get('/', async(req, res) => {
    try {
        const foundLearners = await Learner.find({});
        res.status(200).json(foundLearners);
    } catch (err) {
        res.status(400).send(err);
    }
})

export default router;
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
                year: 2024,
                avg: 70
            },
            {
                name: 'Spongebob',
                enrolled: true,
                year: 2020,
                avg: 90
            },
            {
                name: 'Hermione',
                enrolled: true,
                year: 2023,
                avg: 30
            }
        ])
        res.send('success').status(200);
    } catch (err) {
        res.status(400).send(err);
    }
})

// I - Index         GET         READ - returns all of the entries
// This is my index route
router.get('/', async(req, res) => {
    try {
        const foundLearners = await Learner.find({});
        res.status(200).json(foundLearners);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.get('/passing', async (req, res) => {
    try {
        const result = await Learner.findPassing();
        res.json(result).status(200);
    } catch (err) {
        res.status(400).send(err);
    }
})

// another way to get passing
router.get('/passing2', async (req, res) => {
    try {
        const foundLearners = await Learner.find({});
        // console.log( objectArray.find(e => e.name === 'John') )
        const passingLearners = foundLearners.filter(e => e.avg >= 70);
        res.status(200).json(passingLearners);
    } catch (err) {
        res.status(400).send(err);
    }
})

// S - Show         GET         READ - returns a specific element
// This is my show route
router.get('/:id', async (req, res) => {
    try {
        const foundLearner = await Learner.findById(req.params.id);
        console.log(await foundLearner.getPeers());
        res.status(200).json(foundLearner);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.get('/:id/peers', async (req, res) => {
    try {
        const foundLearner = await Learner.findById(req.params.id);
        const peers =  await foundLearner.getPeers();
        res.status(200).json(peers);
    } catch (err) {
        res.status(400).send(err);
    }
})

export default router;
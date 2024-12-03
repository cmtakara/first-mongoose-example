import mongoose from 'mongoose';

// Define the schema for learners
// mongoose will add the _id property, so you don't need to
// this would work because it has a label and data type
// const learnerSchema = new mongoose.Schema({
//     name: String,
//     enrolled: Boolean,
//     year: Number,
//     avg: Number,
//     campus: String
    
// })

const learnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    enrolled: {
        type: Boolean,
        required: true
    },
    year: {
        type: Number,
        min: 1995,
        message: "The year must be greater than 1995.",
        required: true
    },
    avg: {
        type: Number,
        required: false
        // this required: false is not needed because that is the default
    },
    campus: {
        type: String,
        enum: [
            "Remote",
            "Boston",
            "New York",
            "Denver",
            "Los Angeles",
            "Seattle",
            "Dallas"
        ],
        message: "{VALUE} is not a valid campus location.",
        default: "Remote",
        required: true
    }
    
})

// Compile the schema into a model and export it.
// Models are used much like classes to create instances of objects
// that the schema describes
export default mongoose.model("Learner", learnerSchema);
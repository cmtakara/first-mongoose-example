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
}, {
    timestamps: true
})

// I can add in some indexes
learnerSchema.index({ name: 1});
learnerSchema.index({ year: 1});
learnerSchema.index({ avg: 1});
learnerSchema.index({ campus: 1 });

// ==================== Here are some examples of Schema Methods ====================
// this will give me all of the learners that have the same campus and the same year
// this find has two fields, and there is no operator, so it's an implicit $and
learnerSchema.methods.getPeers = function () {
    // console.log(cb)
    return mongoose.model("Learner").find( { campus: this.campus, year: this.year});
}

// 
learnerSchema.statics.findPassing = function () {
    return this.find({avg: { $gte: 70}});
}

learnerSchema.statics.findByCampus = function (campus) {
    return this.find({ campus });
}

// ===================================================================================
//              query helpers
// ===================================================================================
learnerSchema.query.byName = function (name) {
    return this.where({ name: new RegExp(name, "i")});
}


// ===================================================================================
//              virtuals
// ===================================================================================
learnerSchema.virtual('passing').get(function () {
    return this.avg >= 70;
})


// Compile the schema into a model and export it.
// Models are used much like classes to create instances of objects
// that the schema describes
export default mongoose.model("Learner", learnerSchema);
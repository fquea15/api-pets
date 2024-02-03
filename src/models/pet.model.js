import mongoose from "mongoose";

const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    species: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    image: {
        id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
},{
    timestamps: true,
});

export default mongoose.model('Pet', petSchema)
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";



const reviewSchema = new mongoose.Schema({
    fullName: {type : String, required: true},
    date: {type: Date,required: true},
    location: {type : String, required: true},
    reviewText: {type : String, required: true},
    rating: {
        type: Number,
        required: true,
        min: 1, 
        max: 5 
      }
})


export default mongoose.model('Review', reviewSchema);
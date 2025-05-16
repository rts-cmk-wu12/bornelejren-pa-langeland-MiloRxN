import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema({
    supportType: {
        type: String,
        required: true,
        enum: ['børnesponsorat', 'lejrsponsorat', 'støtte til foreningen']
    },
    companyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    trophy: {
        type: Boolean,
        default: false,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model('Sponsor', sponsorSchema);
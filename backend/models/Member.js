import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    }
});
const Member = mongoose.model("Member", memberSchema);
export default Member;

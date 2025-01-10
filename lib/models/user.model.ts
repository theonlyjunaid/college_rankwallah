import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER', index: true },
    rollNumber: { type: String },
    friends: [{ type: String, ref: 'User' }],
    isActive: { type: Boolean, default: true },
    onboarded: { type: Boolean, default: false }
}, { timestamps: true });

const User = models.User || model("User", userSchema);

export default User;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phonenumber: {
        type: String,
    },
    university: {
        type: String,
    },
    city: {
        type: String,
    },
    emailVerified: {
        type: Date,
    },
    image: {
        type: String,
    },
    hashedPassword: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    favoriteIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
    verificationToken: {
        type: String,
    },
    accounts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
        }
    ],
    listings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listing",
        }
    ],
    reservations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reservation",
        }
    ],
    subleaseListing: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubleaseListing",
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        }
    ],
    bids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bid",
        }
    ]
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

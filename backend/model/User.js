import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user', // Default role is 'user'
    },
    isVerified : {
        type : Boolean,
        required : true,
    },
    cart: [
        {
            productId: { type: String, required: true },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String },
            quantity: { type: Number, default: 1 },
            size: { type: String }
        }
    ],
    wishlist: [
        {
            productId: { type: String, required: true },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String },
            addedAt: { type: Date, default: Date.now }
        }
    ]
})

const User = mongoose.model('User', userSchema)

export default User;
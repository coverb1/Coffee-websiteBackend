import mongoose from 'mongoose'

const cartscheema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usechema',
        required: true
    },
    item: [{
        foodId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,

            default: true
        },
        price: {
            type: Number,
            required: true
        },

       totalAmoount: {
type:Number,
default:0
        },
        image: {
            type: String
        }
    }]
}, { timestamps: true })
export const cartmodel = mongoose.model('cart', cartscheema)
import express from 'express'
import { CodplaceOrder } from "../Controller/ordercontroller.controller.js";
import { StripeplaceOrder } from "../Controller/ordercontroller.controller.js";
import { allOrders } from '../Controller/ordercontroller.controller.js';
import { Updatestatus } from "../Controller/ordercontroller.controller.js";
import { userautha } from '../middleware/userautha.js';
import { userOrders } from '../Controller/ordercontroller.controller.js';

const orderRouter=express.Router()

// Admin Features
orderRouter.post('/listOfAllOrders',allOrders)
orderRouter.post('/orderStatus',Updatestatus)

// payment Features
orderRouter.post('/place',userautha,CodplaceOrder)
orderRouter.post('/stripePayment',userautha,StripeplaceOrder)

orderRouter.post('/userOrders',userautha,userOrders)

export default orderRouter

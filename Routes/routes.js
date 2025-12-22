import express, { Router } from 'express'
import uploads from '../Images/images.js'
import { addfoodcontroller, getexplorefood, getOnefoodDetails } from '../Controller/food.controller.js'
import { registercontroller } from '../Controller/register.controller.js'
import { getuser, logincontroller, logoutuser } from '../Controller/login.controller.js'
import { addtocart, countcartItem, deletecartItem, getaddedcart } from '../Controller/addtocart.controller.js'
import { userautha } from '../middleware/userautha.js'
import { deleteProfileImage, uploadProfileImage } from '../Controller/addprofile.controller.js'

const routes=express.Router()

routes.post('/food',uploads.array('images'),addfoodcontroller)
routes.get('/getfood',getexplorefood)
routes.post('/registered',registercontroller)
routes.post('/login',logincontroller)
routes.post('/addtocart',userautha,addtocart)
routes.get('/getuser',userautha,getuser)
routes.delete('/logout',logoutuser)
routes.get('/getaddedcart',userautha,getaddedcart)
routes.delete('/deleteItem/:id',userautha,deletecartItem)
routes.get('/countcartitems',userautha,countcartItem)
routes.post('/profile/upload',uploads.single('images'),userautha,uploadProfileImage)
routes.delete('/profile/delete/:filename',userautha,deleteProfileImage)
routes.get('/getOneFood/:id',userautha,getOnefoodDetails)

export default routes


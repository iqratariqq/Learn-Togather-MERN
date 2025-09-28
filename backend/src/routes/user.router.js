import express from 'express'
import { checkauth } from '../Middelware/checkauth.js';
import { acceptFriendRequest, getFriedRequests, getMyFriend, getRecommendedFriend, outgoingRequest, sendFriendRequest } from '../controller/user.controler.js';

const userRouter=express.Router();
userRouter.use(checkauth)

userRouter.get("/reccomendedUsers",getRecommendedFriend)
userRouter.get("/friends",getMyFriend)
userRouter.post("/friend-request/:id",sendFriendRequest)
userRouter.put("/friend-request/:id/accept",acceptFriendRequest)
userRouter.get("/friend-request",getFriedRequests)
userRouter.get("/outgoing-request",outgoingRequest)


export default userRouter;


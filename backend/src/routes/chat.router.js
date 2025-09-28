import express from 'express'
import { checkauth } from '../Middelware/checkauth.js';
import { generateStreamToken } from '../utils/StreamUser.js';

const chatRouter =express.Router();

chatRouter.get("/token",checkauth,generateStreamToken)

export default chatRouter;
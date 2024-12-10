import express from "express";
import asynchandler from "../utils/asynchandler.js";
import VerifyToken from "../middlewares/VerifyToken.js"
import {addjob,editjob,getalljobs,getjobdetails,getjobbyid} from "../controllers/Job.controller.js"


const router = express.Router();

router.post('/addjob', VerifyToken, asynchandler(addjob))
router.post('/editjob', VerifyToken, asynchandler(editjob))
router.get('/getalljobs',  asynchandler(getalljobs))
router.get('/getjobdetails/:id', VerifyToken, asynchandler(getjobdetails))
router.get('/getjobbyid', VerifyToken, asynchandler(getjobbyid))


export default router
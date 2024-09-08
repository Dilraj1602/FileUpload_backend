
const express = require('express');
const router=express.Router();

const {localFileUpload,imageUpload,videoupload,imagereducerupload,videoreducerupload}=require('../controllers/filecontroller');

router.post('/localFileUpload',localFileUpload);
router.post('/imageUpload',imageUpload);
router.post('/videoupload',videoupload);
router.post('/imagereducerupload',imagereducerupload);
// router.post('/videoreducer',videoreducerupload);

module.exports=router;
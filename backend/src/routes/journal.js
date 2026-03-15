const express = require("express");
const router = express.Router();
const Journal = require("../models/Journal");
const analyzeText = require("../utils/llm");
const userAuth = require("../middleware/userAuth");


router.post("/",userAuth,async (req,res)=>{

    try{
        
        const {userId, ambience, text} = req.body;
        if(userId != req.user._id.toString()) throw new Error("invalid user id")
        const analysis = await analyzeText(text);
        const newEntry = new Journal({
            userId:userId,
            ambience,
            text,
            analysis
        });
        await newEntry.save();
        res.status(201).json(newEntry);

    }
    catch(err){
        res.status(500).json({error: err.message});
    }

});




router.get("/:userId",userAuth,async (req,res)=>{

    try{
        const userId=req.params.userId;
        if(userId != req.user._id.toString()) throw new Error("invalid user id")
        const entries = await Journal
        .find({userId})
        .sort({createdAt:-1});
        res.json(entries);

    }catch(err){

        res.status(500).json({error: err.message});
    }

});



router.post("/analyze",userAuth,async (req,res)=>{

    try{
        const {text} = req.body;
        const aiResponse = await analyzeText(text);
        res.json(aiResponse);

    }catch(err){

        res.status(500).json({
         error: "AI Analysis Failed"
        });

    }

});



router.get("/insights/:userId",userAuth, async (req,res)=>{

    try{
        const userId=req.params.userId;
        if(userId != req.user._id.toString()) throw new Error("invalid user id")
        const entries = await Journal.find({userId});


        const emotions = entries
        .map(e=>e.analysis?.emotion)
        .filter(Boolean);


        const emotionCount = {};

        emotions.forEach(e=>{
          emotionCount[e] = (emotionCount[e] || 0) + 1;
        });


        const topEmotion =
        Object.keys(emotionCount)
        .reduce((a,b)=>
            emotionCount[a] > emotionCount[b] ? a : b
        ,"N/A");



        const ambienceCount = {};

        entries.forEach(e=>{
            ambienceCount[e.ambience] =(ambienceCount[e.ambience] || 0) + 1;
        });


        const mostUsedAmbience =
        Object.keys(ambienceCount)
        .reduce((a,b)=>
         ambienceCount[a] > ambienceCount[b] ? a : b
        ,"N/A");



        const recentKeywords = entries
        .slice(-3)
        .flatMap(e=> e.analysis?.keywords || []);


        res.json({
            totalEntries: entries.length,
            topEmotion,
            mostUsedAmbience,
            recentKeywords
        });

    }
    catch(err){
        res.status(500).json({error: err.message});
    }

});


module.exports = router;
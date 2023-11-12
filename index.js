const express = require('express');
require('dotenv').config()
const API_KEY=process.env.API_KEY;
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const {Web3} = require("web3");
// const web3 = new Web3("HTTP://127.0.0.1:7545");
const web3 = new Web3(`https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`);
const contractAddress = "0xcc2b6D945703905a1f21B4D7293820802DA08AF3";
const ABI = require("./ABI.json")

const contract = new web3.eth.Contract(ABI, contractAddress);

// console.log(contract)
app.use(cors());
app.use(express.json());

//gender verification
const genderVerification = (gender)=>{
    const genderData = gender.toLowerCase();
    if(genderData === "male" || genderData === "female" || genderData === "others"){
        return true;
    }else{
        return false;
    }
}

app.post("/api/voter-verification",(req,res)=>{
    const {gender} = req.body;
    // console.log(gender);
    const status = genderVerification(gender);
    if(status){
        res.status(200).json({message:"gender was sent correctly"});
    }else{
        res.status(403).json({message:"invalid gender sent"});
    }
})

//checking the time boundary
app.post("/api/time-bound",(req,res)=>{
    const { startTimeSeconds, endTimeSeconds}= req.body;
    //24hr = 86400sec
    //check if the election commission has set the time as the gap between thme is 24hr
    //then the voting time can start otherwise not
    if(endTimeSeconds-startTimeSeconds<86400){
        res.status(200).json({message:"Voting time started"});
    }else{
        res.status(403).json({message:"Voting time not valid"});
    }
})

//party and gender verification of candidates

const partyVerification = async (party)=>{

    const candidateInfo = await contract.methods.candidateList().call();
    const exists = candidateInfo.some((candidate)=>candidate.party===party);
    //console.log(exists)
    return (exists);
}

app.post("/api/candidate-verification", async (req,res)=>{
    const {party, gender} = req.body;
    // console.log(gender,party);

    const genderStatus = await genderVerification(gender);
    // console.log(genderStatus);
    const partyStatus = await partyVerification(party);
    // console.log(partyStatus);

//If party don't match then will get false. Then will register from that party
    if(partyStatus == false && genderStatus == true){
        res.status(200).json({message:"Party and gender are valid"});
    }else{
        res.status(403).json({message:"Invalid party or gender sent"});
    }
})

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})
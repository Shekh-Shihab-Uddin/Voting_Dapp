import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Navigation from "../../components/navigation/Navigation";
import { WalletContext } from "../../components/wallet/Wallet";
import "./ElectionCommision.css";

const ElectionCommision = ({account}) => {
const {contract} = useContext(WalletContext);

const [winner, setWinner] = useState("No Winner");

  const dateToSeconds = (dateTimeString)=>{
    const date = new Date(dateTimeString);
    return Math.floor(date.getTime()/1000);
  }

  const startVoting = async(event)=>{
    event.preventDefault();
    const startTime = document.querySelector("#start").value;
    const endTime = document.querySelector("#end").value;

    const startTimeSeconds = dateToSeconds(startTime)
    const endTimeSeconds = dateToSeconds(endTime)

    // console.log(startTimeSeconds, endTimeSeconds);

    const voteTime={
      startTimeSeconds,
      endTimeSeconds
    }
    try{
      // const res = await fetch("http://localhost:3000/api/time-bound",{
      const res = await fetch("https://voting-server-p92r.onrender.com/api/time-bound",{
        method: "POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(voteTime)
      })
  
      const data = await res.json();
  
      // console.log(data);
  
      if(data.message === "Voting time started"){
        // await contract.methods.voteTime(startTimeSeconds,endTimeSeconds).send({from: account, gas:480000});
        await contract.methods.voteTime(startTimeSeconds,endTimeSeconds).send({from: account});
        toast.success("Voting started");
      }else{
        toast.error("Voting should be less than 24 hours");
      }
    }catch(err){
      toast.error(err);
    }
    
  }


  const resultDeclare = async ()=>{
    await contract.methods.result().send({from: account});
    alert("Result declared");
  }

  const emergencyDeclare = async ()=>{
    await contract.methods.emergency().send({from: account});
    alert("Emergency occured");
  }

  useEffect(()=>{
    const winnerInfo = async()=>{
      const _winner = await contract.methods.winner().call();
      if(_winner=="0x0000000000000000000000000000000000000000"){
        setWinner("No Winner");
      }else{
        setWinner(_winner);
      }
    }
    contract && winnerInfo();
  },[contract,winner]);


  return (
    <>
      <div>
        <Navigation account={account} />
        <div className="election-wrapper">
          <h2>
            Winner is: {winner} <br />
          </h2>
          <form className="election-form" onSubmit={startVoting}>
            <label htmlFor="start">Start Time</label>
            <input type="datetime-local" id="start" required />

            <label htmlFor="end">End Time</label>
            <input type="datetime-local" id="end" required />

            <button className="regBtn" type="submit">
              Voting Start
            </button>
          </form>
        </div>
        <div className="admin-actions">
          <button className="emerBtn" onClick={emergencyDeclare}>
            Emergency
          </button>
          <button className="resultBtn" onClick={resultDeclare}>
            Result
          </button>
        </div>
      </div>
    </>
  );
};

ElectionCommision.propTypes = {
  account: PropTypes.node.isRequired,
};

export default ElectionCommision;

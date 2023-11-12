import PropTypes from "prop-types";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { WalletContext } from "../wallet/Wallet";
import "./Vote.css";
const Vote = ({account}) => {
  const {contract} = useContext(WalletContext);
  const submitVote = async(event)=>{
    event.preventDefault();
    const voterId = document.querySelector("#voterId").value;
    const candidateId = document.querySelector("#candidateId").value;
  
    // console.log(voterId, candidateId);
  try{
    await contract.methods.vote(voterId, candidateId).send({from:account, gas:480000});
    toast.success("Voting Successfull");
  }catch(err){
    toast.error(err);
  }
  
  }
  return (
    <div>

<div className="voter-reg-wrapper ">
        <form className="voter-form" onSubmit={submitVote}>
        <div className="vote-wrapper">
          <h1>Vote Here</h1>
        </div>
        <label htmlFor="start">Voter Id:</label>
        <input type="text" id="voterId"></input>

        <label htmlFor="end">Candidate Id:</label>
        <input type="text" id="candidateId"></input>

        <button className="regBtn" type="submit">
          Vote
        </button>
        </form>
      </div>
      
    </div>
  );
};
Vote.propTypes = {
  account: PropTypes.node.isRequired,
};
export default Vote;

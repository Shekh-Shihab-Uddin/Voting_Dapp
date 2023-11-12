import PropTypes from "prop-types";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import Navigation from "../../components/navigation/Navigation";
import Vote from "../../components/vote/Vote";
import VoterDisplay from "../../components/voterDisplay/VoterDisplay";
import VotingStatus from "../../components/votingStatus/VotingStatus";
import { WalletContext } from "../../components/wallet/Wallet";
import "./VoterRegister.css";

const VoterRegister = ({ account }) => {
const {contract} = useContext(WalletContext);
const VoterRegistration = async(event)=>{
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const age = document.querySelector("#age").value;
  const gender = document.querySelector("#gender").value;

  // console.log(name, age, gender);

  const voterData={
    gender
  }
  try{
    // const res = await fetch("http://localhost:3000/api/voter-verification",{
    const res = await fetch("https://voting-server-p92r.onrender.com/api/voter-verification",{
      method: "POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(voterData)
    })

    const data = await res.json();

    // console.log(data);

    if(data.message === "gender was sent correctly"){
      // await contract.methods.voterRegister(name, age, gender).send({from:account, gas:480000});
      await contract.methods.voterRegister(name, age, gender).send({from:account});
      toast.success("Regstration Successfull");
    }else{
      toast.error("Registration Failed");
    }
  }catch(err){
    toast.error(err);
  }

}


  return (
    <>
      <Navigation account={account} />
      <div className="status-nav">
        <VotingStatus />
      </div>
      <div className="voter-reg-wrapper ">
        <form className="voter-form" onSubmit={VoterRegistration}>
        <div className="reg-wrapper">
          <h1>Register as Voter</h1>
        </div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name"></input>

          <label htmlFor="age">Age:</label>
          <input type="text" id="age"></input>

          <label htmlFor="gender">Gender:</label>
          <input type="text" id="gender"></input>

          <button className="regBtn" type="submit">
            Register
          </button>
        </form>
        <Vote account={account} />
      </div>
      <VoterDisplay />
    </>
  );
};
VoterRegister.propTypes = {
  account: PropTypes.node.isRequired,
};
export default VoterRegister;

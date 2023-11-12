import PropTypes from "prop-types";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import CandidateDisplay from "../../components/candidateDisplay/CandidateDisplay";
import Navigation from "../../components/navigation/Navigation";
import { WalletContext } from "../../components/wallet/Wallet";
import "./CandidateRegister.css";

const CandidateRegister = ({ account }) => {
const {contract} = useContext(WalletContext);
// console.log(contract);
const CandidateRegistration = async(event)=>{
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const party = document.querySelector("#party").value;
  const age = document.querySelector("#age").value;
  const gender = document.querySelector("#gender").value;

  // console.log(name, party, age, gender);
  // console.log(account);

//before talking to the smart contract lets go through the verification mentioned in the server
  const partyData={
    party,
    gender
  }
  try{
    // const res = await fetch("http://localhost:3000/api/candidate-verification",{
    const res = await fetch("https://voting-server-p92r.onrender.com/api/candidate-verification",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(partyData)
    })

    const data = await res.json();
    // console.log(data)
    if(data.message === "Party and gender are valid"){
      // await contract.methods.candidateRegister(name, party, age, gender).send({from:account, gas:480000});
      await contract.methods.candidateRegister(name, party, age, gender).send({from:account});
      toast.success("Registration Successfull");
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
      <div className="reg-cand-wrapper">
        <div className="reg-img-wrapper">
          <h1>Register as Candidate</h1>
        </div>
        <form className="can-reg-form" onSubmit={CandidateRegistration}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name"></input>

          <label className="label1" htmlFor="party">
            Party
          </label>
          <input type="text" id="party"></input>

          <label htmlFor="age">Age</label>
          <input type="text" id="age"></input>

          <label htmlFor="gender">Gender</label>
          <input type="text" id="gender"></input>

          <button className="regBtn" type="submit">
            Register
          </button>
        </form>
      </div>
      <CandidateDisplay />
    </>
  );
};
CandidateRegister.propTypes = {
  account: PropTypes.node.isRequired,
};
export default CandidateRegister;

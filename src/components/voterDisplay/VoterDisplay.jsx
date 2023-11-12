import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../wallet/Wallet";
import "./VoterDisplay.css";

const VoterDisplay = () => {

  const{contract} = useContext(WalletContext);
  const [list, setList] = useState([]);
  useEffect(()=>{
    const getCandidateList = async()=>{
      const voterInfo = await contract.methods.voterList().call();
      // console.log(candidateInfo);
      setList(voterInfo)
    }
    contract && getCandidateList();
  },[contract,list])


  return (
    <div className="table-container">
      <table className="voter-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
        {/* using ternary operator to check if voter List array is empty or not. 
        coz, initially when no voter registered then the array will be black and will give error due to undefined array */}
        {list?(list.map((voter)=>{
            return <tr key= {voter.voterId}>
              <td>{voter.name}</td>
              <td>{voter.age}</td>
              <td>{voter.gender}</td>
            </tr>
          })):<p></p>}
        </tbody>
      </table>
    </div>
  );
};

export default VoterDisplay;

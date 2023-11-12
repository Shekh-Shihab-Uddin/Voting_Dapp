import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../wallet/Wallet";
import "./CandidateDisplay.css";
const CandidateDisplay = () => {
  const{contract} = useContext(WalletContext);
  const [list, setList] = useState([]);
  useEffect(()=>{
    const getCandidateList = async()=>{
      const candidateInfo = await contract.methods.candidateList().call();
      // console.log(candidateInfo);
      setList(candidateInfo)
    }
    contract && getCandidateList();
  },[contract,list])

  return (
    <div className="table-container">
      <table className="voter-table no-boder-sides">
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
        {/* using ternary operator to check if candidate List array is empty or not. 
        coz, initially when no candidate registered then the array will be black and will give error due to undefined array */}
          {list?(list.map((candidate)=>{
            return <tr key= {candidate.candidateId}>
              <td>{candidate.name}</td>
              <td>{candidate.party}</td>
              <td>{candidate.votes}</td>
            </tr>
          })):<p></p>}
        </tbody>
      </table>
    </div>
  );
};
export default CandidateDisplay;

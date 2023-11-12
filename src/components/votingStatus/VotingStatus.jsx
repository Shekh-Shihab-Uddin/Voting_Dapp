import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../wallet/Wallet";

const VotingStatus = () => {
  const {contract} = useContext(WalletContext);
  const [voteStatus, setVoteStatus] = useState(null);
  const statusColor = true === "Voting in progress" ? "#2DFF2D" : "red";

  useEffect(()=>{
    const statusVoting = async()=>{
      const status = await contract.methods.votingStatus().call();
      setVoteStatus(status);
    }

    contract && statusVoting();
  },[contract]);

  return (
    <div style={{ display: "flex" }}>
      Vote Status :
      <div style={{ color: statusColor }}>
        {voteStatus === null ? "no status" : voteStatus}
      </div>
    </div>
  );
};

export default VotingStatus;

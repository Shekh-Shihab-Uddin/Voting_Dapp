import PropTypes from "prop-types";
import { createContext, useState } from "react";
import Web3 from "web3";
import ABI from "../../ABI/ABI.json";
import "./wallet.css";
const WalletContext = createContext();

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  // useEffect(() => {
  //   const init = async () => {
  //     const web3 = new Web3("HTTP://127.0.0.1:7545");
  //     const contractAddress = "0xcc2b6D945703905a1f21B4D7293820802DA08AF3";
  //     //to create contract instance - abi and contract address
  //     const contract = new web3.eth.Contract(ABI, contractAddress);
  //     setState({ web3: web3, contract: contract });
  //   };
  //   init();
  // }, []);

  const init = async () => {
    if(window.ethereum){
      const web3 = new Web3(window.ethereum);

      //script for triggering to open the metamask
      await window.ethereum.request({
        method:"eth_requestAccounts"
      })
      0xcc2b6D945703905a1f21B4D7293820802DA08AF3
      const contractAddress = "0xcc2b6D945703905a1f21B4D7293820802DA08AF3";
      //to create contract instance - abi and contract address
      const contract = new web3.eth.Contract(ABI, contractAddress);
      setState({ web3: web3, contract: contract });
    }
  };

  return (
    <>
      <WalletContext.Provider value={state}>{children}</WalletContext.Provider>
      <button onClick={init} className="connectBtn">Connect to Metamask</button>
    </>
  );
};

Wallet.propTypes = {
  children: PropTypes.node.isRequired,
};
export { WalletContext };
export default Wallet;

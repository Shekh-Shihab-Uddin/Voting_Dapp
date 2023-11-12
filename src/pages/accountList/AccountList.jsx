import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import { WalletContext } from "../../components/wallet/Wallet";
import "./AccountList.css";

const AccountList = ({ saveAccount }) => {
  const { web3 } = useContext(WalletContext);
  const [account, setAccount] = useState("");
  useEffect(() => {
    const allAccounts = async () => {
      var select = document.getElementById("selectNumber");

      //array of accounts available in ganache
      var options = await web3.eth.getAccounts();

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    };
    web3 && allAccounts();
  }, [web3]);
  
  const selectAccount = async () => {
    let selectedAccountAddress = document.getElementById("selectNumber").value;
    setAccount(selectedAccountAddress);

    if (
      selectedAccountAddress &&
      selectedAccountAddress !== "Choose an account"
    ) {
      saveAccount(selectedAccountAddress);
    }
  };
  return (
    <div className="ac-list-wrapper">
      <Navigation account={account} />
      <div className="ac-list-container">
        <img src="voting.jpg" alt="Voting Dapp" width={500} />
        <h1 className="ac-list-title">
          Welcome to Our Decentralized Voting System
        </h1>
        <form className="ac-list-form" id="myForm">
          <select
            className="innerBox"
            id="selectNumber"
            onChange={selectAccount}
            defaultValue=""
          >
            <option disabled value="">
              Choose an account
            </option>
          </select>
        </form>
      </div>
    </div>
  );
};
AccountList.propTypes = {
  saveAccount: PropTypes.func.isRequired, // Change PropTypes.node to PropTypes.func
};

export default AccountList;

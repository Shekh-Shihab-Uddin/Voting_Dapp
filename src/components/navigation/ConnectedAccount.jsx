import PropTypes from "prop-types";
import React from "react";

const ConnectedAccount = ({ account }) => {
  return (
    <p style={{ fontSize: 14, fontWeight: 400 }}>
      Connected Account :<span> </span>
      {account ? account : <span> No Account Connected</span>}
    </p>
  );
};

ConnectedAccount.propTypes = {
  account: PropTypes.node,
};

export default ConnectedAccount;

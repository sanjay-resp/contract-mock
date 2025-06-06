import "./TokenListingSection.css";
import Tilt from "react-parallax-tilt";
import { useState, useEffect } from "react";

import { useData } from "../../../../contexts/DataProvider.js";
import { Link } from "react-router-dom";

import { tokenLedger } from "../../utils/tokenLedger.js";
import { initialUsers } from "../../utils/mockTest.js";

export const TokenListingSection = () => {
  const { state } = useData();
  const users = initialUsers;

  const [userBalances, setUserBalances] = useState({});
  const [showTransferForm, setShowTransferForm] = useState({});
  const [transferInputs, setTransferInputs] = useState({}); // { [userId]: { receiverId: "", amount: "" } }

  useEffect(() => {
    const initialBalances = {};
    users.forEach((user) => {
      initialBalances[user.id] = tokenLedger.balanceOf(user.id);
    });
    setUserBalances(initialBalances);
  }, []);

  const handleMint = (userId) => {
    try {
      const mintAmount = 100;
      tokenLedger.mint(userId, mintAmount);

      const updatedBalance = tokenLedger.balanceOf(userId);
      // alert(result)
      setUserBalances((prev) => ({ ...prev, [userId]: updatedBalance }));
    }
    catch (error) {

      console.error("Error minting tokens:", error);
      alert(`Minting failed. ${error}`);
    }
  };

  const handleTransfer = (senderId) => {
    const input = transferInputs[senderId] || {};
    const receiverId = input.receiverId;
    const amount = parseInt(input.amount);

    if (!receiverId || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid receiver ID and amount.");
      return;
    }

    tokenLedger.transfer(senderId, receiverId, amount);

    const updatedSenderBalance = tokenLedger.balanceOf(senderId);
    const updatedReceiverBalance = tokenLedger.balanceOf(receiverId);

    setUserBalances((prev) => ({
      ...prev,
      [senderId]: updatedSenderBalance,
      [receiverId]: updatedReceiverBalance,
    }));

    // Clear input and close form
    setTransferInputs((prev) => ({ ...prev, [senderId]: { receiverId: "", amount: "" } }));
    setShowTransferForm((prev) => ({ ...prev, [senderId]: false }));
  };

  const toggleTransferForm = (userId) => {
    setShowTransferForm((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleInputChange = (userId, field, value) => {
    setTransferInputs((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="product-card-container">
      {!users.length ? (
        <h2 className="no-products-found">Sorry, there are no matching products!</h2>
      ) :

        (
          users.map(({ _id, id, name, img }) => (
            <Tilt
              key={_id}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glareEnable={false}
              transitionSpeed={2000}
              scale={1.02}
            >
              <div className="product-card" key={_id}>
                <div className="product-card-details">
                  <p> UserId:{id}</p>
                </div>

                <div className="product-card-details">
                  <h3>{name}</h3>
                </div>

                <div>
                  <p className="balance">Balance: {userBalances[id] || 0}</p>
                </div>

                <div className="product-card-buttons">
                  <button onClick={() => handleMint(id)} className="cart-btn">
                    Mint
                  </button>
                  <br />
                  <button onClick={() => toggleTransferForm(id)} className="cart-btn" disabled={userBalances[id] <= 0}>
                    {showTransferForm[id] ? "Cancel" : "Transfer"}
                  </button>

                  {showTransferForm[id] && (
                    <div style={{ marginTop: "1rem" }}>
                      <input
                        type="text"
                        placeholder="Receiver ID"
                        value={transferInputs[id]?.receiverId || ""}
                        onChange={(e) => handleInputChange(id, "receiverId", e.target.value)}
                        style={{ marginBottom: "0.5rem", padding: "0.3rem", width: "90%" }}
                      />
                      <input
                        type="number"
                        placeholder="Amount"
                        value={transferInputs[id]?.amount || ""}
                        onChange={(e) => handleInputChange(id, "amount", e.target.value)}
                        style={{ marginBottom: "0.5rem", padding: "0.3rem", width: "90%" }}
                      />
                      <button onClick={() => handleTransfer(id)} className="cart-btn">
                        Submit Transfer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Tilt>
          ))
        )}
    </div>
  );
};

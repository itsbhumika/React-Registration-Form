import React from "react";
import { useLocation } from "react-router-dom";
import "./success.css"; // Make sure this file exists and is imported

function Success() {
  const { state } = useLocation();
  if (!state) return <p className="no-data">No data!</p>;

  return (
    <div className="success-container">
      <div className="success-card">
        <h2>🎉 Registration Successful!</h2>
        <p className="message">Here are the details you submitted:</p>
        <ul className="details-list">
          {Object.entries(state)
          .filter(([k]) => k !== "showPassword")
          .map(([k, v]) => (
            <li key={k}>
              <span className="field-name">{k.charAt(0).toUpperCase() + k.slice(1)}:</span>
              <span className="field-value">{v.toString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Success;
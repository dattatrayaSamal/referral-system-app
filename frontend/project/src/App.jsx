import React from "react";
import Dashboard from "./components/Dashboard";
import ReferralForm from "./components/ReferralForm";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1>Candidate Referral System</h1>
      <ReferralForm />
      <Dashboard />
    </div>
  );
};

export default App;

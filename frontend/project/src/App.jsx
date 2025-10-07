import React from "react";
import CandidateDashboard from "./components/CandidateDashboard";
import { ReferralProvider } from "./context/ReferralContext";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <ReferralProvider>
        <CandidateDashboard />
      </ReferralProvider>
    </div>
  );
};

export default App;

import React, { createContext, useState, useContext } from "react";

const ReferralContext = createContext();

export const ReferralProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCandidates, setRefreshCandidates] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const triggerRefresh = () => setRefreshCandidates((prev) => !prev);

  return (
    <ReferralContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        refreshCandidates,
        triggerRefresh,
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
};

export const useReferral = () => useContext(ReferralContext);

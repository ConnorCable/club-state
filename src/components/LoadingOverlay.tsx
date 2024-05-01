import React from "react";
import { IonLoading } from "@ionic/react";

const LoadingOverlay: React.FC<{ isOpen: boolean, message: string }> = ({ isOpen, message }) => {
  return (
    <IonLoading
      isOpen={isOpen}
      message={message}
    />
  );
};

export default LoadingOverlay;

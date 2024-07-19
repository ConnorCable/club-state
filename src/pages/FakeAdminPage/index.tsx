import { IonContent, IonPage, IonInput, IonHeader, IonToolbar, IonGrid, IonRoute, IonRow, IonCol, IonTitle, IonButton, IonAlert } from "@ionic/react";
import "./index.css";
import { useState, useEffect } from "react";

const FakeAdminPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble) => {
      (bubble as HTMLElement).style.animationDelay = `-${Math.random() * 10}s`;
      setTimeout(() => bubble.classList.add('animate'), 0);
    });
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: CustomEvent) => {
    const inputEmail = e.detail.value || '';
    setEmail(inputEmail);
    setIsEmailValid(validateEmail(inputEmail));
  };

  const handleSubmit = () => {
    if (isEmailValid) {
      setShowAlert(true);
    }
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
    setEmail('');
    setIsEmailValid(false);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="bubble-container">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
        <IonGrid>
          <IonRow className="top-padding">
            <IonCol>
              <IonTitle>Want your club featured?</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="8" className="input-padding">
              <IonInput label="email" placeholder="Enter your email" value={email} onIonInput={handleEmailChange}></IonInput>
            </IonCol>
            <IonCol className="input-button-padding">
              <IonButton disabled={!isEmailValid} onClick={handleSubmit}>submit</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={handleAlertDismiss}
          message="Thanks for submitting! Our team will contact you shortly"
          buttons={['ok']}
        />
      </IonContent>
    </IonPage>
  );
}

export default FakeAdminPage;
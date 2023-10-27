import {IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import React from "react";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Challenges</IonTitle>
        </IonToolbar>
          <IonToolbar>
              <IonTitle>Pull to Refresh</IonTitle>
          </IonToolbar>

      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Events</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Search" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

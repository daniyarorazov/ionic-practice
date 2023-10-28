import React, {ReactNode} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons } from '@ionic/react'



const ChallengePage = () => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>User Detail</IonTitle>
                </IonToolbar>
            </IonHeader>
        </>
    );
};

export default ChallengePage;
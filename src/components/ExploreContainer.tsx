import './ExploreContainer.css';
import {
    IonAlert,
    IonButton,
    IonActionSheet,
    IonList,
    IonItem,
    IonToggle,
    IonSearchbar,
    IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent
} from "@ionic/react";
import React from "react";
import PeopleImg from "../assets/peoples.png"

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
        <IonSearchbar className="search-bar"></IonSearchbar>

        <div className="card-block">
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Сходить в кофейню
                        Craft, сделать фото,
                        купить кофе</IonCardTitle>
                    <IonCardSubtitle><span>+2 балла</span></IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent class="card-footer-block">
                    <div className="card-img">
                        <img src={PeopleImg} alt=""/>
                    </div>
                    <div className="card-text">
                        12 выполнили
                    </div>
                </IonCardContent>
            </IonCard>

        </div>
    </div>
  );
};

export default ExploreContainer;

import './ExploreContainer.css';
import {
    IonSearchbar,
    IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import PeopleImg from "../assets/peoples.png"
import axios from "axios";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {

    const URL = 'https://raw.githubusercontent.com/daniyarorazov/ionic-practice/master/testData.json';
    let [results, setResults] = useState<any[]>([]);
    let [data, setData] = useState<any[]>([]);

    useEffect(() => {
        axios.get(URL).then((res) => {
            setData([...res.data])
            setResults([...res.data]);
        })
    }, [URL])

    const handleInput = (ev: Event) => {
        let query = '';
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();

        setResults(data.filter((item) => item.title.toLowerCase().indexOf(query.toLowerCase()) > -1));
    };



  return (
    <div className="container">
        <IonSearchbar debounce={500} onIonInput={(ev) => handleInput(ev)} className="search-bar"></IonSearchbar>

        <div className="card-block">
            {results.map((result, key) => (
                <IonCard key={key}>
                    <IonCardHeader>
                        <IonCardTitle>{result.title}</IonCardTitle>
                        <IonCardSubtitle><span>+{result.points} балла</span></IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent class="card-footer-block">
                        <div className="card-img">
                            <img src={PeopleImg} alt=""/>
                        </div>
                        <div className="card-text">
                            {result.countOfMembers} выполнили
                        </div>
                    </IonCardContent>
                </IonCard>
            ))}


        </div>
    </div>
  );
};

export default ExploreContainer;

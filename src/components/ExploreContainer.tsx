import './ExploreContainer.css';
import {
    IonSearchbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    RefresherEventDetail,
    IonRefresher,
    IonRefresherContent,
    IonSkeletonText,
    IonThumbnail,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonInfiniteScroll,
    IonInfiniteScrollContent, IonRoute, IonItem, IonButton, IonActionSheet, useIonActionSheet, useIonAlert
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import PeopleImg from "../assets/peoples.png"
import axios from "axios";
import {chevronDownCircleOutline} from "ionicons/icons";
import {IonRouter} from "@ionic/react-router/dist/types/ReactRouter/IonRouter";
import {Link} from "react-router-dom";
import {OverlayEventDetail} from "@ionic/react/dist/types/components/react-component-lib/interfaces";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {

    const URL = 'https://raw.githubusercontent.com/daniyarorazov/ionic-practice/master/testData.json';
    let [results, setResults] = useState<any[]>([]);
    let [data, setData] = useState<any[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [showInfiniteScroll, setShowInfiniteScroll] = useState<boolean>(true);
    const [startIndex, setStartIndex] = useState(0);
    const [itemsPerPage] = useState(5);
    const [present] = useIonActionSheet();
    const [presentAlert] = useIonAlert();
    const logResult = (result: OverlayEventDetail) => {
        console.log(JSON.stringify(result.data.action, null, 2));
        if (result.data.action === 'delete') {
            presentAlert({
                header: 'Delete',
                subHeader: 'Important message',
                message: 'This is an alert!',
                buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => {
                                console.log('Alert canceled');
                            },
                        },
            {
                text: 'OK',
                    role: 'confirm',
                handler: () => {
                console.log('Alert confirmed');
            },
            },
        ]
            })
        } else if (result.data.action === 'share') {
            presentAlert({
                header: 'Share',
                subHeader: 'Important message',
                message: 'This is an alert!',
                buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => {
                                console.log('Alert canceled');
                            },
                        },
            {
                text: 'OK',
                    role: 'confirm',
                handler: () => {
                console.log('Alert confirmed');
            },
            },
        ]
            })
        }
    };
    const openActionSheet = () => {
        present({
            header: 'Actions',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    data: {
                        action: 'delete',
                    },
                },
                {
                    text: 'Share',
                    data: {
                        action: 'share',
                    },
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    data: {
                        action: 'cancel',
                    },
                },
            ],
            onDidDismiss: ({ detail }) => logResult(detail),
        })
    }

    const generateItems = () => {
        const newData = data.slice(startIndex, startIndex + itemsPerPage);
        setStartIndex(startIndex + itemsPerPage);
        setResults([...results, ...newData]);
    };

    useEffect(() => {
        axios.get(URL)
            .then((res) => {
                setData([...res.data]);
                setResults([...res.data]);
                setLoaded(true);
                //generateItems();
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoaded(true);
            });
    }, [URL]);



    const handleInput = (ev: Event) => {
        let query = '';
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();

        setResults(data.filter((item) => item.title.toLowerCase().indexOf(query.toLowerCase()) > -1));
    };

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            axios.get(URL)
                .then((res) => {
                    setData([...res.data]);
                    setResults([...res.data]);
                    // Установите флаг "loaded" после успешной загрузки данных
                    setLoaded(true);
                    event.detail.complete();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    // В случае ошибки также установите флаг "loaded"
                    setLoaded(true);
                    event.detail.complete();
                });
        }, 2000);

        // Установите флаг "loaded" в false перед вызовом setTimeout
        setLoaded(false);
    }



  return (
    <>

        <IonHeader collapse="condense">

            <IonToolbar>

                <IonTitle size="large">Events</IonTitle>
            </IonToolbar>

        </IonHeader>
        <IonRefresher style={{zIndex: "22222222"}} slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent
                pullingIcon={chevronDownCircleOutline}
                pullingText="Pull to refresh"
                refreshingSpinner="circles"
            ></IonRefresherContent>
        </IonRefresher>

        {loaded && (
            <div className="container">
                <IonSearchbar debounce={500} onIonInput={(ev) => handleInput(ev)} className="search-bar"></IonSearchbar>

                    <div className="card-block">
                        {results.map((result, key) => (
                            <div key={key} style={{cursor: 'pointer'}} onClick={openActionSheet}>
                                <IonCard >
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
                            </div>
                        ))}
                        <IonInfiniteScroll
                            threshold="100px"
                            disabled={!showInfiniteScroll}
                            onIonInfinite={generateItems}
                        >
                            <IonInfiniteScrollContent loadingText="Loading more data..."></IonInfiniteScrollContent>
                        </IonInfiniteScroll>
                    </div>
            </div>
        )}
        {!loaded && (
            <div className="container">

                <IonSearchbar debounce={500} onIonInput={(ev) => handleInput(ev)} className="search-bar"></IonSearchbar>

                <div className="card-block">
                    {results.map((result, key) => (
                        <IonCard key={key}>
                            <IonCardHeader>
                                <IonCardTitle><IonSkeletonText animated={true} style={{ width: '70%' }}></IonSkeletonText></IonCardTitle>
                                <IonCardSubtitle><IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText></IonCardSubtitle>
                            </IonCardHeader>

                            <IonCardContent class="card-footer-block">
                                <IonThumbnail slot="start">
                                    <IonSkeletonText animated={true}></IonSkeletonText>
                                </IonThumbnail>
                                <div style={{width: '100%'}}>
                                    <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
                                    <IonSkeletonText animated={true} style={{ width: '40%' }}></IonSkeletonText>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </div>
            </div>
        )}
    </>
  );
};

export default ExploreContainer;

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom'; // Import from react-router-dom
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { pinSharp, navigateCircleOutline, musicalNoteSharp, musicalNotesSharp, micOutline, micCircleOutline, walkSharp } from 'ionicons/icons';
import { IonIcon, IonProgressBar, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonFooter, IonGrid, IonRow, IonCol, IonSearchbar, IonCard } from '@ionic/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import { useDataStore } from '../../models/DataStore';
import logo from "../../../assets/clubStateLogo.gif";
import './index.css';
import type { CircleLayer } from 'react-map-gl';
import { getClubStateCoords } from '../../helpers/getClubStateCoords';
import { heatmapLayer } from './map-style';
import { ClubCard } from '../ClubCard';
import { ClubProps } from '../../models/ClubProps';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const layerStyle: CircleLayer = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};


const FakeClubCardData: ClubProps = {
    Name: "MAP CARD NAME",
    Address: "MAP CARD ADDRESS",
    Coordinates: {latitude: 120, longitude: 120},
    Id: "CLUB ID",
    ImageStoragePath: "/path",
    RecentCapture: {
      artist: "ARTIST",
      cleanliness: "",
      clubId: "",
      cover: true,
      fullness: "str",
      genre: "string",
      hostility: "string",
      line: true,
      latitude: "string",
      longitude: "string",
      loudness: "string",
      price: "string",
      ratio: "string",
      song: "string",
    },
    ResidingState: "CA"
}

const MapGL: React.FC = () => {
  const [locationChips, setLocationChips] = useState<any>([]);
  const { location, radius, isMapModalOpen, setIsMapModalOpen, currentClubs, genres } = useDataStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [geoJson, setGeoJson] = useState<any>(null);
  const [geoJsonLoaded, setGeoJsonLoaded] = useState(false);
  const [isInteractingWithMap, setIsInteractingWithMap] = useState(false); // State to track map interaction
  const modal = useRef<HTMLIonModalElement>(null);
  const locationHook = useLocation(); 
  const history = useHistory(); 
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const getChipCollection = useCallback(async () => {
    const firestore = firebase.firestore();
    const GeoFirestore = geofirestore.initializeApp(firestore);
    const geocollection = GeoFirestore.collection('geo-clubs');
    const query = geocollection.near({
      center: new firebase.firestore.GeoPoint(location!.coords.latitude, location!.coords.longitude),
      radius: radius
    }).limit(50); // Limit added
    const snapshot = await query.get();
    return snapshot.docs.map((doc: any) => doc.data());
  }, [location, radius]);

  useEffect(() => {
    const fetchData = async () => {
      const chips = await getChipCollection();
      setLocationChips(chips);
      setIsLoading(false);
      const geoJsonData = await getClubStateCoords(location, radius);
      setGeoJson(geoJsonData);
      setGeoJsonLoaded(true);
    };
    fetchData();
  }, [getChipCollection, location, radius]);

  const handleMapLoad = useCallback(() => {
    if (geoJsonLoaded) {
      setMapLoaded(true);
    }
  }, [geoJsonLoaded]);

  useEffect(() => {
    if (geoJsonLoaded) {
      handleMapLoad();
    }
  }, [geoJsonLoaded, handleMapLoad]);

  const memoizedMarkers = useMemo(() =>
    locationChips.map((chip: any) => (
      <Marker
        key={chip.g.geohash}
        longitude={chip.coordinates._long}
        latitude={chip.coordinates._lat}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setIsOpen(true);
          if (modal.current) {
            modal.current.setCurrentBreakpoint(.95);
          }
        }}
      >
        <IonIcon icon={micCircleOutline} size="large" color='danger' style={{ cursor: 'pointer' }} />
      </Marker>
    ))
    , [locationChips]);

  // Handle interactions with the map
  const handleMapInteraction = () => {
    setIsInteractingWithMap(true);
    if (modal.current) {
      modal.current.setCurrentBreakpoint(0.05); // Set to smallest breakpoint
    }
  };

  // Close the modal on route change
  useEffect(() => {
    const handleRouteChange = () => {
      if (isOpen) {
        setIsMapModalOpen(false); // Close the modal
      }
    };

    return history.listen(() => handleRouteChange());
  }, [history, isOpen]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <img src={logo} alt="Loading" style={{ width: 500, height: 500 }} />
        <IonProgressBar type="indeterminate" />
      </div>
    );
  }

  return (
    <div id="map-container" style={{ height: "90vh", width: "90vh", visibility: mapLoaded ? 'visible' : 'hidden', overflow: "hidden" }}>

      <Swiper className="mapGenreSwiper"
        spaceBetween={7}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        modules={[Autoplay]}
      >
      {genres.map((genre: any) => {
            if (!genre.genre) return null;
            return (
              <SwiperSlide key={genre.index} className='mapGenreSwiperElement'>
                <IonCard
                  className="mapGenreCard"
                  color={genre.index === activeButton ? "dark" : "light"}
                  onClick={() => { console.log("Clicked Genre Filter Map")}}
                >
                  <IonCardTitle className="genreTitle ">
                    {genre.genre.length > 5 ? (
                      <sup>
                        <h3>{genre.genre.substring(0, 7)}</h3>
                      </sup>
                    ) : (
                      <sup>
                        <sup>
                          <h1>{genre.genre}</h1>
                        </sup>
                      </sup>
                    )}
                  </IonCardTitle>
                </IonCard>
              </SwiperSlide>
            );
          })}
      </Swiper>
      
      <Map
        mapboxAccessToken="pk.eyJ1IjoibXVra29pIiwiYSI6ImNsdng1bTZwczBnbWoydm82bTE1MXN5YmEifQ.jVrPQmWmp5xMxQamxdASVA"
        initialViewState={{
          longitude: location?.coords.longitude,
          latitude: location?.coords.latitude,
          zoom: 12.5
        }}
        mapStyle="mapbox://styles/mukkoi/clvx641jj01qd01q1dh0074ny"
        scrollZoom={true}
        onRender={() => handleMapInteraction()} // Track map interaction
        onLoad={handleMapLoad}
      >
        
        {mapLoaded && geoJsonLoaded && (
          <Source type="geojson" data={geoJson}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
        {mapLoaded && memoizedMarkers}
        {mapLoaded && location?.coords.longitude != undefined && location.coords.latitude != undefined && (
          <Marker latitude={location.coords.latitude} longitude={location.coords.longitude}>
            <IonIcon icon={walkSharp} size="large" color='success' />
          </Marker>
        )}
      </Map>

      <IonModal
        ref={modal}
        isOpen={isMapModalOpen}
        onDidDismiss={() => setIsOpen(false)}
        backdropDismiss={false}
        initialBreakpoint={0.05}
        breakpoints={[0.05, .95]}
        backdropBreakpoint={0.05}
        className="floating-modal"
        showBackdrop={false}
      >
        <IonHeader>
          Put time here / other simple metrics
        </IonHeader>        
        <IonContent className="main-map-modal-content">
          <IonSearchbar></IonSearchbar>     
          <h1 className='map-card-title'>CLUB NAME</h1>
        </IonContent>
        <IonFooter className='map-modal-footer'>
          <IonButton fill="clear" color="warning" onClick={() => {
            console.log("DIRECTION BUTTON CLICKED");
          }}>
            <IonGrid>
              <IonRow>
                <IonCol size='2'></IonCol>
                <IonCol size='2'></IonCol>
                <IonCol size='0'> <IonText className="ion-text-justify" color="dark"> <h6>Directions</h6> </IonText></IonCol>
                <IonCol> <IonIcon className="ion-padding" size='small' icon={navigateCircleOutline} color='dark'></IonIcon></IonCol>
              </IonRow>
            </IonGrid>
          </IonButton>
        </IonFooter>
      </IonModal>
    </div>
  );
};

export default MapGL;

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom'; // Import from react-router-dom
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { pinSharp, navigateCircleOutline, musicalNoteSharp, musicalNotesSharp, micOutline, micCircleOutline, walkSharp, add, locateOutline, addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { IonIcon, IonProgressBar, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonFooter, IonGrid, IonRow, IonCol, IonSearchbar, IonCard, IonChip } from '@ionic/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import { useDataStore } from '../../models/DataStore';
import logo from "../../../assets/clubStateLogo.gif";
import './index.css';
import type { CircleLayer, MapboxMap, MapRef } from 'react-map-gl';
import { getClubStateCoords } from '../../helpers/getClubStateCoords';
import { heatmapLayer } from './map-style';
import { ClubCard } from '../ClubCard';
import { ClubProps } from '../../models/ClubProps';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { getStorageURL } from '../../helpers/getClubCardCollection';
import useClubStore from '../../models/ClubStore';



const layerStyle: CircleLayer = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

const MapCard: React.FC<any> = ({ name, address, photo, imagePath, recentCapture, lat, long, id, residingState }) => {
  
  return (
    <ClubCard onClick={function (): void {
    } } ClubProps={{Name: name, Address: address, ImageStoragePath: imagePath, RecentCapture: recentCapture, Coordinates: {latitude: lat, longitude: long}, Id: id, ResidingState: residingState}}></ClubCard>
  );
};



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
  const [selectedClub, setSelectedClub] = useState<any | null>(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [filteredChips, setFilteredChips] = useState<any[]>([]);
  const mapRef = useRef<MapRef>(null); 
  const [isFlying, setIsFlying] = useState<boolean>(false);

  const getChipCollection = useCallback(async () => {
    const firestore = firebase.firestore();
    const GeoFirestore = geofirestore.initializeApp(firestore);
    const geocollection = GeoFirestore.collection('geo-clubs');  
   
  
    const query = geocollection.near({
      center: new firebase.firestore.GeoPoint(location!.coords.latitude, location!.coords.longitude),
      radius:  
   radius
    }).limit(50); 
  
    const snapshot = await query.get();
  
    const chipPromises = snapshot.docs.map(async (doc) => {
      const chipData = doc.data(); 
      const clubId = doc.id; // Assuming each chip is also associated with a club
  
      // Fetch the clubURL (adjust `getStorageURL` and storage path as needed)
      const clubUrl = await getStorageURL(chipData['imageStoragePath']); // Assuming a field like 'clubImageStoragePath' exists in your chip data
  
      // Optionally, update clubRefs if needed (similar to getClubCardCollection)
      const clubRef = firestore.collection('geo-clubs').doc(clubId);
      useClubStore.getState().updateClubRefs(clubId, clubRef); 
  
      return { 
        ...chipData, // Include all the original chip data
        id: doc.id, 
        clubURL: clubUrl 
      };
    });
  
    const chipArray = await Promise.all(chipPromises);
    return chipArray;
  }, [location, radius]);

  
  const handleCenterOnMyLocation = () => {
    if (mapRef.current && location) {
      mapRef.current.flyTo({
        center: [location.coords.longitude, location.coords.latitude], // Center on user's location
        zoom: 15, // Adjust the zoom level as needed
        duration: 2000 // Adjust the animation duration as needed
      });
    }
  };

  const handleMarkerClick = (chip: any) => {

    if(!isMapModalOpen)
    {
      setIsMapModalOpen(true);
      modal.current?.setCurrentBreakpoint(0.35);
    }
    
    setPopupInfo(chip);
    setIsOpen(true);
    setSelectedMarkerId(chip.g.geohash); 

    if (mapRef.current) {
      
      setIsFlying(true);

      mapRef.current.flyTo({
        center: [chip.coordinates._long, chip.coordinates._lat,],
        zoom: 15,
        duration: 2000 
      },);

      setTimeout(() => {
        setIsFlying(false);
      }, 4000);

    setTimeout(() => {
      if (modal.current) {
        modal.current.setCurrentBreakpoint(.30);
      }  
    }, 300)

    }

    
  };

  useEffect(() => {
    // Filter locationChips based on activeGenre
    const newFilteredChips = activeGenre
      ? locationChips.filter((chip: any) => {
          return chip.recentCapture && chip.recentCapture.genre && chip.recentCapture.genre === activeGenre;
        })
      : locationChips; // If no activeGenre, show all chips

    setFilteredChips(newFilteredChips);
  }, [locationChips, activeGenre]);


  const handleGenreClick = (genre: string) => {
    setActiveGenre(genre); 
    const genreIndex = genres.findIndex((g: any) => g.genre === genre);
    setActiveButton(genreIndex);
    
  };

  
  useEffect(() => {
    const fetchData = async () => {
      const chips = await getChipCollection();
      setLocationChips(chips);
      setFilteredChips(chips);
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
    filteredChips.map((chip: any) => (
      <Marker
        key={chip.g.geohash}
        longitude={chip.coordinates._long}
        latitude={chip.coordinates._lat}
        anchor="bottom"
        onClick={() => handleMarkerClick(chip)}
      >
      <IonIcon 
          icon={micCircleOutline} 
          size="large" 
          color={selectedMarkerId === chip.g.geohash ? '' : 'danger'} 
          style={{ cursor: 'pointer' }} 
        />
      </Marker>
    ))
    , [filteredChips, selectedMarkerId]);


  const handleMapInteraction = () => {

    if(!isFlying)
    {
      setIsInteractingWithMap(true);
    if (modal.current) {
      modal.current.setCurrentBreakpoint(0.01); // Set to smallest breakpoint
    }
    }
  };

  // Close the modal on route change
  useEffect(() => {
    const handleRouteChange = () => {
      if (isOpen) {
        setIsMapModalOpen(false); // Close the modal
      }
      setSelectedMarkerId(null);
      setActiveGenre(null);
      setPopupInfo(null);
      setActiveButton(null);
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
    <div id="map-container" style={{ height: "100%", width: "100%", visibility: mapLoaded ? 'visible' : 'hidden', overflow: "hidden" }}>

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
                  onClick={() => { handleGenreClick(genre.genre)}}
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

      <div className="chip-container"> {/* Add a container for the chip */}
      <IonChip
        color="danger"
        className="ion-text-center ion-text-capitalize"
        outline={true}
        onClick={() => { 
          setSelectedMarkerId(null); 
          setActiveGenre(null);
          setPopupInfo(null);
          setActiveButton(null);
        }}
      >
        X
      </IonChip>
    </div>
      
      <Map
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoibXVra29pIiwiYSI6ImNsdng1bTZwczBnbWoydm82bTE1MXN5YmEifQ.jVrPQmWmp5xMxQamxdASVA"
        initialViewState={{
          longitude: location?.coords.longitude,
          latitude: location?.coords.latitude,
          zoom: 14.5
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

      <div className="map-controls">
        <IonButton onClick={handleCenterOnMyLocation} size='small' color="dark">
          <IonIcon icon={locateOutline} /> {/* Center on my location icon */}
        </IonButton>

      </div>

      <IonModal
        ref={modal}
        isOpen={isMapModalOpen}
        onDidDismiss={() => setIsMapModalOpen(false)}
        backdropDismiss={false}
        initialBreakpoint={0.01}
        breakpoints={[0.01, .30]}
        backdropBreakpoint={0.01}
        className="floating-modal"
        showBackdrop={false}
      >
        <div 
    slot="backdrop" 
    onClick={() => modal.current?.setCurrentBreakpoint(0.01)} 
  />
        <IonContent className="main-map-modal-content">
          {popupInfo != null && 
            (<MapCard 
                name={popupInfo.name} 
                address={popupInfo.address} 
                genre={popupInfo.genre}
                recentCapture={popupInfo.recentCapture}
                lat={popupInfo.coordinates._lat}
                long={popupInfo.coordinates._long} 
                imagePath={popupInfo.clubURL}
                residingState={popupInfo.residingState}
              />
            )
          }
        </IonContent>
        <IonFooter className='map-modal-footer'>
          <IonButton fill="clear" color="warning" onClick={() => {
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

import React from "react";
import GoogleMapReact from 'google-map-react';


interface Map {
  lat: number,
  lng: number,
  text: string,
}

interface marker {
  lat: number,
  lng: number,
  text: string
}

const Divcomp: React.FC<marker> = ({lat,lng,text}) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);


export default function Map(){
  const defaultProps = {
    center: {
      lat: 38.677959,
      lng: -121.176056
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA09rOO1u5io_qURoy9I3bKWEf1kv5oWrQ" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals

      >  
      <Divcomp lat={38.581573} lng={-121.494400} text="sacramento"/>
      </GoogleMapReact>
    </div>
  );
}




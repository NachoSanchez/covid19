import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'
import { MAPBOX_TOKEN } from '../api'

const Map = () => {
    const [viewport, setViewport]= useState({
        width: 400,
        heigth: 400,
        latitude: -38.4161,
        longitude: -63.6167,
        zoom: 2
    });
    console.log( viewport )
    return (
        <ReactMapGL
           { ...viewport }
           width="100vw"
           height="100vh"
           mapStyle="mapbox://styles/mapbox/dark-v9"
           onViewportChange={setViewport}
           mapboxApiAccessToken={MAPBOX_TOKEN}
        /> 
    )
}

export default Map;
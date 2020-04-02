import React, { useState, useContext, useEffect } from 'react'
import { CountryContext } from '../contexts/CountryContext'
import ReactMapGL from 'react-map-gl'
import { MAPBOX_TOKEN } from '../api'
import styles from './Map.module.css'

const Map = () => {
    const { latitude, longitude } = useContext(CountryContext);
    const [viewport, setViewport]= useState({
        latitude: latitude,
        longitude: longitude,
        zoom: 3
    });
    
    useEffect(()=>{
        setViewport({...viewport, latitude, longitude});
    }, [latitude, longitude])

    return (
        <section className={styles.map}>
            <ReactMapGL
                { ...viewport }
                width="100%"
                height="100%"
                onViewportChange={setViewport}
                mapboxApiAccessToken={ MAPBOX_TOKEN }
            />
        </section>
    )
}

export default Map;
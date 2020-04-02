import React, { useState, useContext, useEffect } from 'react'
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { CountryContext } from '../contexts/CountryContext'
import  { WorldContext } from '../contexts/WorldContext'
import { StaticMap } from 'react-map-gl'
import { MAPBOX_TOKEN } from '../api'
import styles from './Map.module.css'

const Map = () => {
    const { latitude, longitude } = useContext(CountryContext);
    const { locations } = useContext(WorldContext);
    const [viewport, setViewport]= useState({
        latitude: latitude,
        longitude: longitude,
        zoom: 3
    });

    const layer = new HeatmapLayer({
        id: 'heatmap_Layer',
        data: locations,
        intensity: 15,
        getPosition: d => d.coordinates,
        getWeight: d => d.confirmed   
    });
    
    
    useEffect(()=>{
        setViewport({...viewport, latitude, longitude});
    }, [latitude, longitude]);

    return (
            <section className={styles.map}>
                <DeckGL
                    initialViewState={ viewport }
                    width="100%"
                    height="100%"
                    onViewportChange={setViewport}
                    controller={true}
                    layers={[layer]}
                >
                    <StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} />
                </DeckGL>
            </section>
    )
}

export default Map;
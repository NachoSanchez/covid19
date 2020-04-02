import React, { createContext, useMemo, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { WORLD_DATA_API } from '../api';

export const WorldContext = createContext();

const WorldContextProvider = (props) => {
    const [ rawData, isFetching ] = useFetch( WORLD_DATA_API );
    const [ world, setWorld ] = useState(null)
    //proccesing fetched data
    let proccessedData = [];

    if ( !isFetching ) {
        const locations = rawData.locations
        locations.map(
            location => {
                let pl = {};
                pl.country = location.country;
                pl.province = location.province;
                pl.coordinates = [ 
                    location.coordinates.latitude,
                    location.coordinates.longitude
                 ];
                pl.deaths = location.latest.deaths;
                pl.confirmed = location.latest.confirmed;
                return proccessedData.push(pl)
            });
    }
    //setting proccessed data to the state
    useEffect((proccessedData)=>{
        setWorld(proccessedData)
    }, [ isFetching ])


    const providerValue = useMemo(() => ({ ...world}), [ world]);

    return (
        <WorldContext.Provider value={providerValue}>
            { props.children }
        </WorldContext.Provider>
    )
}

export default WorldContextProvider;
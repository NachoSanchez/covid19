import React, { createContext, useState, useMemo } from 'react';

export const CountryContext = createContext();

const CountryContextProvider = (props) => {

    const [ country, setCountry ] = useState({
        spanish: "Argentina",
        english: "Argentina",
        code: "AR",
        latitude: -34,
        longitude: -64,
        flag: "https://restcountries.eu/data/arg.svg"
    });

    const providerValue = useMemo(() => ({ ...country, setCountry}), [ country, setCountry ]);
    console.log(country)
    return ( 
        <CountryContext.Provider value={ providerValue }>
            { props.children }
        </CountryContext.Provider>
    );
}
 
export default CountryContextProvider;
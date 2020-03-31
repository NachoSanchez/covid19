import React, { createContext, useState, useMemo } from 'react';

export const CountryContext = createContext(null);

const CountryContextProvider = (props) => {

    const [ country, setCountry ] = useState('AR');

    const providerValue = useMemo(() => ({ country, setCountry}), [ country, setCountry ]);

    return ( 
        <CountryContext.Provider value={ providerValue }>
            { props.children }
        </CountryContext.Provider>
    );
}
 
export default CountryContextProvider;
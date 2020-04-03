import React from 'react';
import Global from './components/Global'
import Search from './components/Search'
import Map from './components/Map'
import CountryContextProvider from './contexts/CountryContext';
import WorldNumbers from './components/WorldNumbers';

const App = () => {
  return (
    <div className="App">
      <CountryContextProvider>
        <Search/>
        <Map />
        <Global />
      </CountryContextProvider>
    </div>
  );
}

export default App;

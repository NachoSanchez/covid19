import React from 'react';
import Global from './components/Global'
import Search from './components/Search'
import Map from './components/Map'
import CountryContextProvider from './contexts/CountryContext';
import WorldContextProvider from './contexts/WorldContext';

const App = () => {
  return (
    <div className="App">
      <CountryContextProvider>
        <Search/>
        <WorldContextProvider>
          <Map />
        </WorldContextProvider>
        <Global />
      </CountryContextProvider>
    </div>
  );
}

export default App;

import React from 'react';
import Statistics from './components/Statistics'
import Search from './components/Search'
import Map from './components/Map'
import CountryContextProvider from './contexts/CountryContext';

const App = () => {
  return (
    <div className="App">
      <CountryContextProvider>
        <Search/>
        <Map />
        <Statistics />
      </CountryContextProvider>
    </div>
  );
}

export default App;

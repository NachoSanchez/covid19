import React from 'react';
import Global from './components/Global'
import Search from './components/Search'
import CountryContextProvider from './contexts/CountryContext';

function App() {
  return (
    <div className="App">
      <CountryContextProvider>
        <Search/>
        <Global />
      </CountryContextProvider>
    </div>
  );
}

export default App;

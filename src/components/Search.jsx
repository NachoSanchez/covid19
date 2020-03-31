import React, { useContext, useState } from 'react';
import { CountryContext } from '../contexts/CountryContext';
import  countries  from '../api/countries.json';

const Search = () => {
    const { setCountry } = useContext(CountryContext);
    const [ search, setSearch ] = useState('');
    const [ isShowing, setShowing ] = useState(false);

    const sugestedCountries = countries.filter( country => 
       country.spanish.toLowerCase().indexOf( search.toLowerCase() ) !== -1
    );

    const handleChange = (e) => {
        setSearch(e.target.value);
        console.log(sugestedCountries)
    }

    return (
      <div >
          <input type="text" onChange={handleChange}/>
          <ul>
              { search.length !== 0 ? (
                  sugestedCountries.map( 
                    filtered => (
                    <li key={filtered.code } 
                        onClick={() => {
                            setCountry(filtered.code);
                            setShowing(!isShowing);
                        }}
                    >
                    { filtered.spanish + ' (' + filtered.code +')' }
                    </li>
                    ))
              ):(null)}
              
          </ul>
      </div>
    );
}
 
export default Search;
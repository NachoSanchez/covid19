import React, { useContext, useState } from 'react';
import { CountryContext } from '../contexts/CountryContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import  countries  from '../api/countries.json';
import styles from './Search.module.css'

countries.sort();

const Search = () => {
    const { setCountry } = useContext(CountryContext);
    const [ search, setSearch ] = useState('');
    const [ isShowing, setShowing ] = useState(false);

    const handleChange = (e) => {
        setSearch(e.target.value);

        if( e.target.value === ''){
            setShowing(false);
        } else {
            setShowing(true);
        }
    }

    let suggestedCountries = countries.filter( country => 
        (country.spanish.toLowerCase().indexOf( search.toLowerCase() ) !== -1)
    );

    const toggleShowing = () => {
        setShowing(!isShowing)
        suggestedCountries = countries
    }

    return (
      <section>
          <div className={ styles.search }>
            <input 
                value={ search }
                type="text" 
                onChange={handleChange}
                onClick={}
                placeholder='Buscar por pais...'
            />
            <button>
                <FontAwesomeIcon icon={ faSearch } />
            </button>
            <button 
             onClick={ toggleShowing }
            >
                <FontAwesomeIcon icon={ isShowing ? faChevronUp : faChevronDown } />
            </button>
          </div>
          <ul className={ isShowing ? styles.suggestions : styles.none }>
              { suggestedCountries.map( 
                    filtered => (
                    <li key={filtered.code } 
                        onClick={() => {
                            setCountry(filtered.code);
                            setShowing(!isShowing);
                            setSearch(filtered.spanish);
                        }}
                    >
                    { filtered.spanish + ' (' + filtered.code +')' }
                        <img 
                            src={filtered.flag} 
                            alt={`bandera de ${filtered.spanish}`}
                        />
                    </li>
                ))
              }
              
          </ul>
      </section>
    );
}
 
export default Search;
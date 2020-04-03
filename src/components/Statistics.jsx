import React, { useContext } from 'react';
import StatsPanel from './StatsPanel';
import Title from './Title'
import { CountryContext } from '../contexts/CountryContext';
import useFetch from '../hooks/useFetch';
import { COVID19_WORLD_URL, COVID19_URL }  from '../api';
import styles from './Statistics.module.css';

const Statistics = () => {
    //Fetching Data
    const { code, spanish, flag } = useContext(CountryContext);
    const [ confirmedByState, isFetchingCases ] = useFetch( COVID19_WORLD_URL +'confirmed');
    const [ recoveredByState ] = useFetch( COVID19_URL + code +'/recovered');

    //Reducing data for total result filtering by country
    let WorldTotals = {
        recovered: 0,
        confirmed: 0,
        deaths: 0,
        active: 0,
    };

    let CountryTotals = {
        recovered: 0,
        confirmed: 0,
        deaths: 0,
        active: 0
    };

   const recovered = recoveredByState.reduce(
        (sum, el) => (
            typeof el.recovered == "number"
            ? sum + el.recovered
            : sum), 0)

    confirmedByState.forEach(
        el => {
            if( el.iso2 === code ) {
                CountryTotals.confirmed = CountryTotals.confirmed + el.confirmed
                CountryTotals.recovered = CountryTotals.recovered + el.recovered;
                CountryTotals.deaths = CountryTotals.deaths + el.deaths;
                CountryTotals.active = CountryTotals.active + el.active;
            }
    });

    confirmedByState.forEach( 
        el => {
            WorldTotals.recovered = WorldTotals.recovered + el.recovered;
            WorldTotals.deaths = WorldTotals.deaths + el.deaths;
            WorldTotals.confirmed = WorldTotals.confirmed + el.confirmed;
            WorldTotals.active = WorldTotals.active + el.active;
    });

    const validate = CountryTotals.recovered === 0;
    CountryTotals.recovered = validate ? recovered : CountryTotals.recovered

    const CountryPartials = confirmedByState.filter(
        el => el.iso2 === code
    )

    return ( 
        <main className={styles.wrapper}> 
            <Title 
                text={`${spanish} (${code}) `}
                img={ flag } 
            />
            <StatsPanel 
                confirmed={ isFetchingCases ? '0' : CountryTotals.confirmed }
                recovered={ isFetchingCases ? '0' : CountryTotals.recovered }
                deaths={ isFetchingCases ? '0' : CountryTotals.deaths }
                active={ isFetchingCases ? '0' : CountryTotals.active }
            />

            <Title text="Contexto Mundial."/>
            <StatsPanel 
                confirmed={ isFetchingCases ? '0' : WorldTotals.confirmed }
                recovered={ isFetchingCases ? '0' : WorldTotals.recovered }
                deaths={ isFetchingCases ? '0' : WorldTotals.deaths }
                active={ isFetchingCases ? '0' : WorldTotals.active }
            />
        </main>
     );
}
 
export default Statistics;
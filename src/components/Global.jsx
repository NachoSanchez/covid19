import React, { useContext } from 'react'
import { CountryContext } from '../contexts/CountryContext'
import useFetch from '../hooks/useFetch'
import { COVID19_WORLD_URL, COVID19_URL }  from '../api'

const Global = () => {
    //Fetching Data
    const { code, spanish } = useContext(CountryContext);
    const [ confirmedByState, isFetchingCases ] = useFetch( COVID19_WORLD_URL +'confirmed');
    const [ recoveredByState ] = useFetch( COVID19_URL + code +'/recovered');

    const getPercentage = ( partial, total ) => {
        let percentage = (partial * 100) / total
        return Number((percentage).toFixed(2))
    };

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

    console.log(CountryPartials)

    return ( 
        <div>
           <h1> { spanish } </h1>
            <p>
               confirmados: {isFetchingCases ? '0' : CountryTotals.confirmed }
               <small> | ACTIVOS: { /*isFetchingCases? '0%' : total.activePercentage + ' %' */}</small>
            </p>
            <p>
                muertos: { isFetchingCases ? '0' : CountryTotals.deaths }
               <small>{ /*isFetchingCases? ' | (0%)' :' | ('+ total.deathsPercentage + ' %)'*/ }</small>

            </p>
            <p>
                recuperados: { isFetchingCases ? '0' : CountryTotals.recovered }
               <small>{/* isFetchingCases? ' (0%)' : ' | ('+ total.recoveredPercentage + ' %)'*/ }</small>

            </p>
        </div>
     );
}
 
export default Global;
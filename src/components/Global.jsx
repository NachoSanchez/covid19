import React, { useContext } from 'react'
import { CountryContext } from '../contexts/CountryContext'
import useFetch from '../hooks/useFetch'
import { COVID19_API }  from '../api'

const Global = () => {
    //Fetching Data
    const { country } = useContext(CountryContext);
    const [ casesByState, isFetchingCases ] = useFetch( COVID19_API + country +'/confirmed');
    const [ recoveredByState, isFetchingRecovered ] = useFetch(COVID19_API + country + '/recovered')

    const getPercentage = ( partial, total ) => {
        let percentage = (partial * 100) / total
        return Number((percentage).toFixed(2))
    };
    //Reducing data for total result
    const recoveredTotal = recoveredByState.reduce(
        (sum, el) => (
        typeof el.recovered == "number" 
        ? sum + el.recovered
        : sum), 0);

    const confirmedTotal = casesByState.reduce(
        (sum, el) => (
        typeof el.confirmed == "number" 
        ? sum + el.confirmed 
        : sum), 0);

    const deathsTotal = casesByState.reduce(
        (sum, el) => (
        typeof el.deaths == "number" 
        ? sum + el.deaths 
        : sum), 0);

    const activeTotal = casesByState.reduce(
        (sum, el) => (
        typeof el.active == "number" 
        ? sum + el.active 
        : sum), 0);
    //total object will contain the reduced info and make the percentages needed
    const total = {
        confirmed: confirmedTotal,
        deaths: deathsTotal,
        recovered: recoveredTotal,
        active: activeTotal,
        activePercentage: getPercentage(activeTotal, confirmedTotal),
        recoveredPercentage: getPercentage(recoveredTotal, confirmedTotal),
        deathsPercentage: getPercentage(deathsTotal, confirmedTotal)
    };

    return ( 
        <div>
           <h1> { country } Numbers </h1>
            <p>
               confirmados: {isFetchingCases ? '0' : total.confirmed }
               <small> | ACTIVOS: { isFetchingCases? '0%' : total.activePercentage + ' %' }</small>
            </p>
            <p>
                muertos: { isFetchingCases ? '0' : total.deaths }
               <small>{ isFetchingCases? ' | (0%)' :' | ('+ total.deathsPercentage + ' %)' }</small>

            </p>
            <p>
                recuperados: { isFetchingRecovered ? '0' : total.recovered }
               <small>{ isFetchingCases? ' | (0%)' : ' | ('+ total.recoveredPercentage + ' %)' }</small>

            </p>
        </div>
     );
}
 
export default Global;
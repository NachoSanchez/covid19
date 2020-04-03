import React from 'react';
import styles from './Statistics.module.css';

const StatsPanel = (props) => {
    const getPercentage = ( partial, total ) => {
            let percentage = (partial * 100) / total;
            percentage = Number((percentage).toFixed(2));
            if ( isNaN(percentage)) {
                return 0
            }
            return percentage;
    };

    const setNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    return (
        <section className={styles.stats}>
            <div className={ styles.confirmed }>
                <h4>CONFIRMADOS</h4>
                <p>{setNumber(props.confirmed)}</p>
                <small>
                {   `ACTIVOS: ${getPercentage( props.active, props.confirmed )} % ` }
                </small>
            </div>
            <div className={ styles.deaths }>
                <h4>FALLECIDOS</h4>
                <p>{setNumber(props.deaths)}</p>
                <small>
                {   `${getPercentage( props.deaths, props.confirmed )} % ` }
                </small>
            </div>
            <div className={ styles.recovered }>
                <h4>RECUPERADOS</h4>
                <p>{setNumber(props.recovered)}</p>
                <small>
                {   `${getPercentage( props.recovered, props.confirmed )} % ` }
                </small>
            </div>
        </section>
    )
}

export default StatsPanel;
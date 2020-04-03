import React from 'react';
import styles from './Statistics.module.css';

const Title = (props) => {
    return ( 
        <div className={styles.title}>
           <h2>{ props.text }</h2> 
           { props.img ? (
               <img src={props.img} alt={props.title}/>
           ) : (null) }
        </div>
     );
}
 
export default Title;
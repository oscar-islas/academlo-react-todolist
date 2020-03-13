import React from 'react';
import './404-styles.css';

export default function NotFound(){
    return(
        <div className="site">
            <div className="sketch">
                <div className="bee-sketch red"></div>
                <div className="bee-sketch blue"></div>
            </div>

        <h1>404:
            <small>No se encontró la sección que estabas buscando</small></h1>
        </div>
    )
}
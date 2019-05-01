import React, { Fragment } from 'react';
import './ScrollBtn.css';


function ScrollButton(){
    function scrollToTop() {
        document.getElementById('main-section').scrollBy({ top: -10000, behavior: 'smooth' });
    }
    return (
        <Fragment>
            <button onClick={ () => {scrollToTop()}} className="scrollBtn"></button>
        </Fragment>
    );
}

export default ScrollButton;
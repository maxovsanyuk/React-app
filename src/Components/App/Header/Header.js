
import React, { Fragment } from 'react';
import '../Header/Header.css';

function Header(props){
    return (
        <Fragment>
            <header className="header" id="header">
                <section className="header-section">
                    <a onClick={() => {document.location.reload(true)}} className="header-logo"> </a>
                    <div className="header-btn-container">
                        <button className="top-rated-btn header-btn" onClick={props.data.getTopRated}>Top Rated</button>
                        <button className="top-liked-btn header-btn" onClick={props.data.getTopLiked}>Top Liked</button>
                        <button className="top-trending-btn header-btn" onClick={props.data.getTopTrending}>Top 20 trending movies</button>
                        <button className="refresh-btn" onClick={() => {document.location.reload(true)}}> </button>
                    </div>
                </section>
            </header>
        </Fragment>
    );
}

export default Header;
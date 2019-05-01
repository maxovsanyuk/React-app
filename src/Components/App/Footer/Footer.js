import React, { Fragment } from 'react';
import './Footer.css';
import ScrollButton from '../Pagination/ScrollBtn/ScrollBtn';

function Footer(){
    return (
        <Fragment>
            <footer className="footer">
                    <a href="https://www.linkedin.com/in/maksym-ovsianiuk-252372174/" className="linkedin"> </a>
                    <a href="https://github.com/maxovsanyuk" className="github"> </a>
                    <ScrollButton />
            </footer>
        </Fragment>
    );
}

export default Footer;
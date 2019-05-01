import React, { Component, Fragment } from 'react';
import './Pagination.css';

class Pagination extends Component {

    getPage = ({target}) => {
        const pageNumber = target.getAttribute('data-page-number');
        const allPaginationBtn = document.querySelectorAll('.pagination_counter_btn');
        allPaginationBtn.forEach((item) => {
            item.classList.add('dis-active');
        });
        target.classList.remove('dis-active');
        target.classList.add('active');
        const GET_DAT = `https://api.themoviedb.org/3/discover/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=${pageNumber}`
        fetch(GET_DAT)
        .then(response => response.json())
        .then(data => {
            this.props.state.paginationItemsData(data);
        })
    }

    render(){

        let getInitPage = this.props.state.initPage.map((item, index) => {
            if(index === 0){
                return(
                <Fragment key={index}>
                    <button className="active pagination_counter_btn" id={index} onClick={this.getPage} data-page-number={item}>{item}</button>
                </Fragment>
                )
              }
              return(
                <Fragment key={index}>
                    <button id={index} className="dis-active pagination_counter_btn" onClick={this.getPage} data-page-number={item}>{item}</button>
                </Fragment>
              )
        });

        return(
            <Fragment>
                <section className="pagination">
                    <button className="previous-btn" onClick={this.props.state.previousPage}>Previous</button>
                    <div>
                        {getInitPage}
                    </div>
                    <button className="next-btn" onClick={this.props.state.nextPage}>Next</button>
                </section>
            </Fragment>
        )
    }
}

export default Pagination;


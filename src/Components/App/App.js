import React, { Component, Fragment } from 'react';
import 'normalize.css';
import './App.css';
import Header from '../App/Header/Header';
import VideoItems from './VideoItems/VideoItems';


function createFirstPage(){
  const allPaginationBtn = document.querySelectorAll('.pagination_counter_btn');
  allPaginationBtn.forEach((item, index) => {
    item.classList.remove('active');
    if(index === 0){
      item.classList.remove('dis-active');
      item.classList.add('active');
    }
  });
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      initialPage: 1,
      initPage: [1,2,3,4,5],
      isLoaded: false,
      isFirstPage: true,
      nextPage: () => {
          this.setState({
            initialPage: this.state.initialPage += 5,
        })
        createFirstPage();
        const GET_DATA = `https://api.themoviedb.org/3/discover/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=${this.state.initialPage}`
        fetch(GET_DATA)
        .then(response => response.json())
        .then(data => {
          this.setState({
            data: data.results,
            isFirstPage: false,
            initPage: this.state.initPage.map(item =>
              item +5
            )
          })
        })
      },
      previousPage: () => {
        if(this.state.isFirstPage){return}
        this.state.isFirstPage === false && this.state.initialPage > 5 ? this.setState({ initialPage: this.state.initialPage -= 5, isFirstPage: false }) : this.setState({ isFirstPage: true });
        createFirstPage();
        const GET_DATA = `https://api.themoviedb.org/3/discover/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=${this.state.initialPage}`
        fetch(GET_DATA)
        .then(response => response.json())
        .then(data => {
          this.setState({
            data: data.results,
            initPage: this.state.isFirstPage === true ? this.state.initPage : this.state.initPage.map(item =>
              item -5
            )
          })
        })
      },
      paginationItemsData: (data) => {
        this.setState({
          data: data.results,
        })
      },
      renderSimilarVideo: (data) => {
        this.setState({
          data: data.results
        })
        document.getElementById('main-section').scrollBy({ top: -10000, behavior: 'smooth' });
        const allPaginationBtn = document.querySelectorAll('.pagination_counter_btn');
        allPaginationBtn.forEach((item) => {
          item.classList.add('dis-active');
        });
      },
      getTopRated: () => {
        this.setState({
          data: this.state.data.sort((a, b) =>{
            return b.vote_average - a.vote_average})
        })
      },
      getTopLiked: () => {
        this.setState({
          data: this.state.data.sort((a, b) =>{
            return b.vote_count - a.vote_count})
        })
      },
      getTopTrending: () => {
        const GET_TOP_POPULAR = `https://api.themoviedb.org/3/trending/all/day?api_key=5874acfd11651a28c55771624f7021f4`
        fetch(GET_TOP_POPULAR)
        .then(response => response.json())
        .then(data => {
          this.setState({
            data: data.results,
          })
        })
      }
    }
  }

  componentDidMount() {
    const GET_DATA = `https://api.themoviedb.org/3/discover/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=${this.state.initialPage}`
    fetch(GET_DATA)
    .then(response => response.json())
    .then(data => {
      this.setState({
        data: data.results,
        isLoaded: true,
      })
    })
  }

  render() {
    return (
      <Fragment>
        <Header data={this.state} />

        { this.state.isLoaded ? (
          <VideoItems data={this.state.data} state={this.state} />
        ) : (
          <div className="preloader"></div>
        )}
      </Fragment>
    );
  }
}

export default App;



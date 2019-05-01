import React, { Component, Fragment } from 'react';
import './VideoItems.css';
import YouTube from 'react-youtube';
import Pagination from '../Pagination/Pagination';
import Footer from '../Footer/Footer';


class VideoItems extends Component{
    constructor(props){
        super(props);
        this.state = {
            movieKey: '',
            dataRelise: '',
            opts: {
                playerVars: {
                  autoplay: 1
                }
            },
        }
    }

    closeIfrane(){
        this.setState({
            movieKey: ''
        })
        document.getElementById('youtube-iframe').classList.remove('flex');
    }

    createVideoBlock = ({target}) => {
        const key = target.getAttribute('data-key');
        const dataReliseKey = target.getAttribute('data-relise');
        fetch(`https://api.themoviedb.org/3/movie/${key}/videos?api_key=5874acfd11651a28c55771624f7021f4&language=en-U`)
        .then(response => response.json())
        .then(data => {
            if(data.results.length){
                this.setState({
                    movieKey: data.results[0].key,
                    dataRelise: dataReliseKey,
                  })
            }
            console.log(this.state.dataRelise);
            document.getElementById('youtube-iframe').classList.add('flex');
        })
    }

    getSimilarVideo = ({target}) => {
        const key = target.getAttribute('data-key');
        fetch(`https://api.themoviedb.org/3/movie/${key}/similar?api_key=5874acfd11651a28c55771624f7021f4&language=en-US`)
        .then(response => response.json())
        .then(data => {
            this.props.state.renderSimilarVideo(data);
        })
    }

    render(){
        let filmItems = this.props.data.map((item, index) =>
            <div id="main-section" className="item-section" key={item.id}>
                <div className="player-placeholder">
                <button className="get-similar-btn" data-key={item.id}  onClick={this.getSimilarVideo}>Show 20 similar movies</button>
                    <button className="play-btn" data-key={item.id} data-relise={item.release_date} onClick={this.createVideoBlock}></button>
                    <button onClick={ (event) => {
                        let overviewContent = document.getElementsByClassName('overview-content')[index];
                        overviewContent.classList.toggle('overview-content-act');
                        event.currentTarget.classList.toggle('overview-btn-close');
                    }} className="overview-btn"></button>
                    <div className="overview-content">
                        <h1 className="film-title">{item.title}</h1>
                        <div className="item-overview">{item.overview}</div>
                    </div>
                </div>
                <span className="people-counter">{item.vote_count}</span>
                <span className="imdb-rate">{item.vote_average}</span>
                <span className="item-lang">{item.original_language}</span>
                <img className="film-poster" alt={item.overview} src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
            </div>

        );

        return(
            <Fragment>
                <main className="main-section" id="main-section">
                    <div className="youtube-container" id="youtube-iframe">
                    <span className="release-date">Release date: {this.state.dataRelise}</span>
                        <button className="close-ifrem" onClick={this.closeIfrane.bind(this)}></button>
                        <YouTube
                            videoId={this.state.movieKey}
                            opts={this.state.opts}
                            className="youtube-iframe"/>
                    </div>
                    <section className="movies-container">
                        {filmItems}
                        <Pagination state={this.props.state} />
                        <Footer />
                    </section>
                </main>
            </Fragment>
        )
    }
}

export default VideoItems;
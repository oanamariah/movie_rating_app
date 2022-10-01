import React from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Movies from "./components/Movies";
import MovieListHeading from "./components/MovieListHeading";
import Search from "./components/Search";
import Favourites from "./components/Favourites";
import RemoveFavourites from "./components/RemoveFavourites";
import { seriesArray, moviesArray } from "./components/Constants";


function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [year, setYear] = useState(null);
  const [type, setType] = useState('movie');
  const [favourites, setFavourites] = useState([]); // list of favourite movies
  const [randomSeries, setRandomSeries] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [searchFound, setSearchFound] = useState(false);
  const API_KEY = "387772cd";

  // generate a random word to search
  const randomSearchValueGenerator = (type) => {
    if (type === "series") {
      const position = Math.floor(Math.random() * seriesArray.length);
      return seriesArray[position];

    } else if (type === "movies") {
      const position = Math.floor(Math.random() * moviesArray.length);
      return moviesArray[position];
    }
  };

  // make the request to the API 
  const getMovieRequest = async (searchValue) => {

    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`;
    const res = await fetch(url);
    const resJson = await res.json(); // convert the http response into json

    var finalListOfMovies = [];
    for (var i = 0; i < resJson.Search.length; i++) {
      var resMovie = await fetch(`http://www.omdbapi.com/?t=${resJson.Search[i].Title}&apikey=${API_KEY}`);
      var resMovieJson = await resMovie.json();
      finalListOfMovies.push(resMovieJson);
    }

    if (resJson.Search && finalListOfMovies) {
      setMovies(finalListOfMovies);
      setSearchFound(true);
      // console.log(movies); --> unknown behaviour ->  this is behind one step, if I search refresh, search "pasta" -> movies: [], and then if I search "potato" -> movies: [pasta movies]
    }
  };




  // make the request to the API 
  const getDataFromAPI = async (searchValue, type, year, setFunction) => {

    const url = `http://www.omdbapi.com/?type=${type}&y=${year}&s=${searchValue}&apikey=${API_KEY}`;
    const res = await fetch(url);
    const resJson = await res.json(); // convert the http response into json

    var finalListOfMovies = [];
    for (var i = 0; i < resJson.Search.length; i++) {
      var resMovie = await fetch(`http://www.omdbapi.com/?t=${resJson.Search[i].Title}&apikey=${API_KEY}`);
      var resMovieJson = await resMovie.json();
      finalListOfMovies.push(resMovieJson);
    }
    console.log(finalListOfMovies);
    if (resJson.Search && finalListOfMovies) {
      setFunction(finalListOfMovies);
    }
  };


  useEffect(() => {
    getDataFromAPI(searchValue, type, year, setMovies);
  }, [searchValue]); // the getMovieRequest function is going to be called only when the page loads

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-rating-app-favourites'));
    setFavourites(movieFavourites);
  }, []);

  useEffect(() => {
    const randomMoviesSearch = randomSearchValueGenerator("movies");
    getDataFromAPI(randomMoviesSearch, "movie", null, setRandomMovies);
  }, []); // loads the random movies row

  useEffect(() => {
    const randomSeriesSearch = randomSearchValueGenerator("series");
    getDataFromAPI(randomSeriesSearch, "series", null, setRandomSeries);
  }, []); // loads the random series row



  // after refresh the movies are not saved, this function deals with this problem
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-rating-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    var newFavourites;
    if (favourites !== null) {
      newFavourites = [movie, ...favourites];
    } else {
      newFavourites = [movie];
    }
    setFavourites(newFavourites);
    saveToLocalStorage(newFavourites);
  };

  const removeFromFavourites = (movie) => {
    const newFavourites = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavourites);
    saveToLocalStorage(newFavourites);
  };

  return (
    <div className='container-fluid movie-app'>

      {/* search bar */}
      <div className='row d-flex align-items-center mt-4 mb-4'></div>
      <div className='row'>
        <MovieListHeading heading='' />
        <Search className="d-flex align-items-center mt-4 mb-4" searchValue={searchValue} setSearchValue={setSearchValue} year={year} setYear={setYear} type={type} setType={setType} />
      </div>

      {/* search results */}
      <div className='row d-flex align-items-center mt-4 mb-4'>
        {searchFound && <MovieListHeading heading='Search results' />}
      </div>
      <div className='row'>
        <Movies movies={movies} favouritesComponent={Favourites} handleFavouritesClick={addFavouriteMovie} />
      </div>

      {/* random movies row */}
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
      </div>
      <div className='row'>
        <Movies movies={randomMovies} favouritesComponent={Favourites} handleFavouritesClick={addFavouriteMovie} />
      </div>

      {/* random series row */}
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Series' />
      </div>
      <div className='row'>
        <Movies movies={randomSeries} favouritesComponent={Favourites} handleFavouritesClick={addFavouriteMovie} />
      </div>

      {/* favourites row */}
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        <Movies movies={favourites} favouritesComponent={RemoveFavourites} handleFavouritesClick={removeFromFavourites} />
      </div>
    </div>
  );
}

export default App;

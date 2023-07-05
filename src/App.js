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
  const [searchValue, setSearchValue] = useState('peach');
  const [year, setYear] = useState(null);
  const [type, setType] = useState('movie');
  const [favourites, setFavourites] = useState([]); // list of favourite movies
  const [randomSeries, setRandomSeries] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [secondSearch, setSecondSearch] = useState(searchValue);
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
  const getDataFromAPI = async (searchValue, type, year, setFunction) => {

    const url = `http://www.omdbapi.com/?type=${type}&y=${year}&s=${searchValue}&apikey=${API_KEY}`;
    const res = await fetch(url);
    const resJson = await res.json(); // convert the http response into json
    if (resJson.Error === "Too many results." && secondSearch !== searchValue) {
      setErrorMessage(resJson.Error);
      setSecondSearch(searchValue);
    } else if (resJson.Error === "Movie not found!" && secondSearch !== searchValue) {
      setErrorMessage(resJson.Error);
      setSecondSearch(searchValue);
    }
    else {
      var finalListOfMovies = [];
      for (var i = 0; i < resJson.Search.length; i++) {
        var resMovie = await fetch(`http://www.omdbapi.com/?t=${resJson.Search[i].Title}&apikey=${API_KEY}`);
        var resMovieJson = await resMovie.json();
        if (resMovieJson.Poster !== "N/A") {
          finalListOfMovies.push(resMovieJson);
        }
      }
      if (resJson.Search && finalListOfMovies) {
        setFunction(finalListOfMovies);
      }
    }
  };


  useEffect(() => {
    async function fetchData() {
      await getDataFromAPI(searchValue, type, year, setMovies);
    }
    fetchData();
  }, [searchValue]); // the getMovieRequest function is going to be called only when the page loads

  useEffect(() => {
    const localFavourites = localStorage.getItem('react-movie-rating-app-favourites');
    let movieFavourites = null;
    if (localFavourites !== undefined) {
      movieFavourites = JSON.parse(localFavourites);
    }
    // let movieFavourites = JSON.parse(localStorage.getItem('react-movie-rating-app-favourites'));
    if(movieFavourites == null) {
      movieFavourites = [];
    }
    setFavourites(movieFavourites);
  }, []);

  useEffect(() => {
    const randomMoviesSearch = randomSearchValueGenerator("movies");
    console.log("-------------------------------->randommovies");
    console.log(randomMoviesSearch);
    async function fetchData() {
      await getDataFromAPI(randomMoviesSearch, "movie", null, setRandomMovies);
    }
    fetchData();
    // getDataFromAPI(randomMoviesSearch, "movie", null, setRandomMovies);
    console.log(randomMovies);
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
    // search to see of the favourite is already added
    const found = favourites.filter((favourite) => favourite.imdbID == movie.imdbID);
    if (found.length == 0) {// movie isn't already a favourite
      if (favourites !== null) { 
        newFavourites = [movie, ...favourites];
      } else {
          newFavourites = [movie];
      }
      setFavourites(newFavourites);
      saveToLocalStorage(newFavourites);
    }
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
      <div className='row d-flex align-items-center mt-4 mb-4'></div>

      {/* search results */}
      <div className='row d-flex align-items-center mt-4 mb-4'>
        {(errorMessage !== '') && (secondSearch === searchValue) && <MovieListHeading heading={`${errorMessage}`} />}
      </div>
      <div className='row'>
        {(secondSearch !== searchValue) && <Movies movies={movies} favouritesComponent={Favourites} handleFavouritesClick={addFavouriteMovie} />}
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'></div>

      {/* random movies row */}
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
      </div>
      <div className='row'>
        <Movies movies={randomMovies} favouritesComponent={Favourites} handleFavouritesClick={addFavouriteMovie} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'></div>

      {/* random series row */}
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Series' />
      </div>
      <div className='row'>
        <Movies movies={randomSeries} favouritesComponent={Favourites} handleFavouritesClick={addFavouriteMovie} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'></div>

      {/* favourites row */}
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        <Movies movies={favourites} favouritesComponent={RemoveFavourites} handleFavouritesClick={removeFromFavourites} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'></div>
    </div>
  );
}

export default App;

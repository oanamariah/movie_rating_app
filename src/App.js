import React from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Movies from "./components/Movies";
import MovieListHeading from "./components/MovieListHeading";
import Search from "./components/Search";
import Favourites from "./components/Favourites";
import RemoveFavourites from "./components/RemoveFavourites";
import Popup from "react-popup";

// used to initialize the movies variable, to get the ui working
const setOfMovies = [{
  "Title": "Batman Begins",
  "Year": "2005",
  "imdbID": "tt0372784",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
},
{
  "Title": "The Batman",
  "Year": "2022",
  "imdbID": "tt1877830",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg"
},
{
  "Title": "Batman",
  "Year": "1989",
  "imdbID": "tt0096895",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BZDNjOGNhN2UtNmNhMC00YjU4LWEzMmUtNzRkM2RjN2RiMjc5XkEyXkFqcGdeQXVyMTU0OTM5ODc1._V1_SX300.jpg"
},
{
  "Title": "Batman: The Animated Series",
  "Year": "1992–1995",
  "imdbID": "tt0103359",
  "Type": "series",
  "Poster": "https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg"
}];

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]); // list of favourite movies
  const [listOfMovies, setListOfMovies] = useState([]);

  // make the request to the API 
  const getMovieRequest = async (searchValue) => {

    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=387772cd`;
    const res = await fetch(url);
    const resJson = await res.json(); // convert the http response into json
    console.log(resJson);

    var finalListOfMovies = [];
    for (var i = 0; i < resJson.Search.length; i++) {
      var resMovie = await fetch(`http://www.omdbapi.com/?t=${resJson.Search[i].Title}&apikey=387772cd`);
      var resMovieJson = await resMovie.json();
      finalListOfMovies.push(resMovieJson);
    }
    // var finalListOfMovies = [];
    // resJson.Search.map(async (movie) => {
    //   var resMovie = await fetch(`http://www.omdbapi.com/?t=${movie.Title}&apikey=387772cd`);
    //   var resMovieJson = await resMovie.json();
    //   finalListOfMovies.push(resMovieJson);
    // });

    console.log(finalListOfMovies);

    if (resJson.Search && finalListOfMovies) {
      // setMovies(resJson.Search);
      // setListOfMovies(finalListOfMovies);
      setMovies(finalListOfMovies);
      // console.log(movies); --> unknown behaviour ->  this is behind one step, if I search refresh, search "pasta" -> movies: [], and then if I search "potato" -> movies: [pasta movies]
    }
  };


  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]); // the getMovieRequest function is going to be called only when the page loads

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-rating-app'));
    setFavourites(movieFavourites);
  }, []);

  // after refresh the movies are not saved, this function deals with this problem
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-rating-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavourites = [...favourites, movie];
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
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <Movies movies={movies} favouritesComponent={Favourites} handleFavouritesClick={addFavouriteMovie} />
      </div>


      {/* <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        <Movies movies={favourites} favouritesComponent={RemoveFavourites} handleFavouritesClick={removeFromFavourites} />
      </div> */}




    </div>
  );
}

export default App;

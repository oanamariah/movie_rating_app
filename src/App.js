import React from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Movies from "./components/Movies";
import MovieListHeading from "./components/MovieListHeading";
import Search from "./components/Search";
import Favourites from "./components/Favourites";

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
  const [favourites, setFavourites] = useState(''); // list of favourite movies

  // make the request to the API 
  const getMovieRequest = async (searchValue) => {

    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=387772cd`;
    const res = await fetch(url);
    const resJson = await res.json(); // convert the http response into json
    console.log(resJson);
    if (resJson.Search) {
      setMovies(resJson.Search);
    }
  };


  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]); // the getMovieRequest function is going to be called only when the page loads

  const addFavouriteMovie = (movie) => {
    const newFavourites = [...favourites, movie];
    setFavourites(newFavourites);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        {/* the movie list */}
        <Movies movies={movies} favourites={Favourites} handleFavouritesClick={addFavouriteMovie} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        {/* the favourites list */}
        <Movies movies={favourites} favourites={Favourites} handleFavouritesClick={addFavouriteMovie} />
      </div>
    </div>
  );
}

export default App;

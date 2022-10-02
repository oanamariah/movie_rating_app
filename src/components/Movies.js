import React from "react";
import Rating from "./Rating";


const Movies = (props) => {
    const Favourites = props.favouritesComponent; // the "Add to favourites" bar on the bottom of the movie poster

    return (
        <>
            {props.movies.map((movie, index) => (
                <div className="image-container d-flex justify-content-start m-3" key={index}>

                    <Rating rating={movie.imdbRating} movie={movie} />

                    <img src={movie.Poster} alt='movie'></img>

                    <button className="favouritesComponent d-flex align-items-center justify-content-center" onClick={() => props.handleFavouritesClick(movie)}> <Favourites /> </button>

                    {/* <div className="overlay d-flex align-items-center justify-content-center" onClick={() => props.handleFavouritesClick(movie)}>
                        <Favourites />
                    </div> */}

                    <div className="overlay">
                        <hr></hr>
                        <h5>Plot:</h5>
                        <p>
                            {movie.Plot}
                        </p>
                    </div>

                </div>
            ))}
        </>
    );
};

export default Movies;
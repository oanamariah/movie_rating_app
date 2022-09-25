import React from "react";
import Favourites from "./Favourites";
import Rating from "./Rating";

const Movies = (props) => {
    const Favourites = props.favouritesComponent; // the "Add to favourites" bar on the bottom of the movie poster

    return (
        <>
            {props.movies.map((movie, index) => (
                <div className="image-container d-flex justify-content-start m-3" key={index}>
                    <div className="persistent d-flex align-items-center justify-content-end">
                        <Rating rating={movie.imdbRating} />
                    </div>
                    <img src={movie.Poster} alt='movie'></img>
                    {/* <div className="overlay d-flex align-items-center justify-content-center" onClick={() => props.handleFavouritesClick(movie)}>
                        <Favourites />
                    </div> */}

                </div>
            ))}
        </>
    );

    /* For the first version of return, if the key={index} was missing there would be an error
    like this: react_devtools_backend.js:4026 Warning: Each child in a list should have a unique "key" prop.
    A more elegant way to do this would be to use React.Children.toArray because when rendering the list
    through the React.Children.toArray method, React will return the children opaque data structure as a
    flat array with keys assigned to each child.
    */
    /*
    return (
        <>
            {React.Children.toArray(props.map((movie, index) => {
                <div className="d-flex justify-content-start m-3"> 
                    <img src={movie.Poster} alt='movie'></img>
                </div>
            }))}
        </>
    );
    */
};

export default Movies;
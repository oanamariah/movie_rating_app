import React, { useState } from "react";
import "./Popup.css";
import { FaStar } from "react-icons/fa";

const saveUserRating = (movie, rating) => {
    movie["userRating"] = rating;
    const ratings = JSON.parse(localStorage.getItem('react-movie-rating-app-ratings'));
    if (ratings !== null) {
        const newRatings = [...ratings, movie];
        localStorage.setItem('react-movie-rating-app-ratings', JSON.stringify(newRatings));
    } else {
        const newRatings = [movie];
        localStorage.setItem('react-movie-rating-app-ratings', JSON.stringify(newRatings));
    }

}

const Popup = (props) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">

                    {[...Array(10)].map((star, index) => {
                        const ratingVal = index + 1;
                        return (
                            <>
                                <label className="ratingContainer">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingVal}
                                        onClick={() => {
                                            setRating(ratingVal)
                                        }}
                                    />
                                    <FaStar
                                        className="star"
                                        color={ratingVal <= (hover || rating) ? "gold" : "gray"}
                                        size={20}
                                        onMouseEnter={() => setHover(ratingVal)}
                                        onMouseLeave={() => setHover(null)}>
                                    </FaStar>
                                </label>
                            </>
                        )

                    })}



                    <button onClick={() => { props.setPopup(false); saveUserRating(props.movie, rating) }}> X </button>
                </div>
            </div>
        </div>
    )
};

export default Popup;
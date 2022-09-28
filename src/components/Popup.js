import React, { useState } from "react";
import "./Popup.css";
import { FaStar } from "react-icons/fa";

const Popup = ({ setPopup }) => {
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
                                <label>
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



                    <button onClick={() => { setPopup(false); }}> X </button>
                </div>
            </div>
        </div>
    )
};

export default Popup;
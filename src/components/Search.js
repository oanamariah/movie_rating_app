import React, { useState } from "react";

const Search = (props) => {
    const [buttonVal, setButtonVal] = useState("Movie");

    const handleClick = () => {
        if (buttonVal === "Movie") {
            setButtonVal("Series");
            props.setType("series");
        } else if (buttonVal === "Series") {
            setButtonVal("Movie & Series");
            props.setType(null);
        } else if (buttonVal === "Movie & Series") {
            setButtonVal("Movie");
            props.setType("movie");
        }
    }

    // const handleSubmitButton = () {
    //     props.setType(buttonVal);
    //     props.setYear();
    //     props.setSearchValue();
    // }
    return (
        <div className="col col-sm-4 d-flex">
            <input
                type="number"
                max="2022"
                min="1888"
                className="form-control"
                placeholder="Year..."
                value={props.year}
                onChange={(event) => { props.setYear(event.target.value) }}
            ></input>
            <button className="btn" onClick={handleClick}>{buttonVal}</button>
            <input
                className="form-control"
                placeholder="Type to search..."
                value={props.value}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        props.setSearchValue(event.target.value);
                    }
                }}
            ></input>
            {/* <input type="submit" value="Submit" onClick={}> </input> */}
        </div >
    )
}

export default Search;
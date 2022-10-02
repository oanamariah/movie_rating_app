import React, { useState } from "react";

const Search = (props) => {
    const [buttonVal, setButtonVal] = useState("Movie");
    const [search, setSearch] = useState(null);

    const handleClick = () => {
        if (buttonVal === "Movie") {
            setButtonVal("Series");
            props.setType("series");
        } else if (buttonVal === "Series") {
            setButtonVal("All");
            props.setType(null);
        } else if (buttonVal === "All") {
            setButtonVal("Movie");
            props.setType('movie');
        }
    }

    return (
        <div className="col d-flex">
            <input
                type="number"
                max="2022"
                min="1888"
                className="year"
                placeholder="Year..."
                value={props.year}
                onChange={(event) => { props.setYear(event.target.value) }}
            ></input>
            <button className="btn" onClick={handleClick}>{buttonVal}</button>
            <input
                className="search"
                placeholder="Type to search..."
                value={props.value}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        setSearch(event.target.value);
                        props.setSearchValue(event.target.value);
                    }
                }}
            ></input>
            {/* <button className="btn" type="submit" value="Submit" onClick={props.setSearchValue(search)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </button> */}
        </div >
    )
}

export default Search;
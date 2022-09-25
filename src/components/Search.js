import React from "react";



const Search = (props) => {
    return (
        <div className="col col-sm-4">
            <input
                className="form-control"
                placeholder="Type to search..."
                value={props.value}
                // onChange={(event) => props.setSearchValue(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        // event.preventDefault();
                        props.setSearchValue(event.target.value);
                    }
                }}
            ></input>
        </div>
    )
}

export default Search;
import React from "react";

const Search = ({ onChangeVal }) => {
  return (
    <form className="add-form">
      <div className="form-control">
        <label>Search</label>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => onChangeVal(e.target.value)}
        />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default Search;

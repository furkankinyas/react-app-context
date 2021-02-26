import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { GlobalContext } from "../context/context";

const searchInput = {
  width: "300px",
};

export default function Header() {
  let match = useRouteMatch();
  const { data, dispatch } = useContext(GlobalContext);

  return (
    <header className="background-primary color-white padding-md height-md flex between middle margin-bottom-md">
      <div className="flex middle">
        <h1 className="font-weight-7 margin-right-lg">React My App</h1>
        {match.url !== "/about/" && (
          <input
            style={searchInput}
            onChange={(e) => dispatch({ type: "SEARCH_TEXT", searchText: e.target.value })}
            value={data.searchText}
            className="radius-max height-sm padding-md"
            placeholder="arama"
            type="text"
          />
        )}
      </div>
      <nav>
        <ul className="flex">
          <li className="margin-right-md">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

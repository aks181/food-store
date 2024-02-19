import { useEffect, useState } from "react";
import resList from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";
import { API_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filterSelected, setFilterSelected] = useState(false);
  const [searchResultList, setSearchResultList] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(API_URL);

    const json = await data.json();
    console.log(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setSearchResultList(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  return (
    <div className="main-container">
      <div className="search-bar-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Restaurants..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        <button
          type="button"
          className="search-btn"
          onClick={() => {
            const searchResults = listOfRestaurants.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setSearchResultList(searchResults);
          }}
        >
          <i className="material-icons">search</i>
        </button>
      </div>
      <div className="filters-container">
        <span
          className={
            filterSelected ? "filter-btn filter-btn-active" : "filter-btn"
          }
          onClick={() => {
            const filteredList = resList.filter((res) => {
              return res.info.avgRating > 4.2;
            });
            if (filterSelected) {
              setListOfRestaurants(resList);
              setFilterSelected(false);
            } else {
              setListOfRestaurants(filteredList);

              setFilterSelected(true);
            }
          }}
        >
          Ratings 4.2+
        </span>
      </div>
      {listOfRestaurants?.length === 0 ? (
        <Shimmer></Shimmer>
      ) : (
        <div className="res-container">
          {searchResultList.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
            >
              <RestaurantCard key={restaurant.info.id} resData={restaurant} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;

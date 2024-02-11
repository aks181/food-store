import { useEffect, useState } from "react";
import resList from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";
import { API_URL } from "../utils/constants";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filterSelected, setFilterSelected] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(API_URL);

    const json = await data.json();
    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  return (
    <div className="main-container">
      <div className="search-bar-container">Search</div>
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
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;

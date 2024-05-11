import { useContext, useEffect, useState } from "react";
import resList from "../utils/mockData";
import RestaurantCard, { withVegLabelRestaurantCard } from "./RestaurantCard";
import { API_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/hooks/useOnlineStatus";
import InternetError from "./InternetError";
import UserContext from "../utils/UserContext";
import FoodItemsCarousel from "./FoodItemsCarousel";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filterSelected, setFilterSelected] = useState(false);
  const [searchResultList, setSearchResultList] = useState([]);
  const [foodItemsImageCards, setFoodItemImageCards] = useState([]);

  const [searchText, setSearchText] = useState("");

  const isOnline = useOnlineStatus();

  const user = useContext(UserContext);
  // console.log(user);

  const PureVegRestaurantCard = withVegLabelRestaurantCard(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(API_URL);

    const json = await data.json();

    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setSearchResultList(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFoodItemImageCards(
      json?.data?.cards?.find((x) => x?.card?.card?.id === "whats_on_your_mind")
        ?.card?.card?.imageGridCards?.info
    );
  };

  if (isOnline === false) {
    return <InternetError />;
  }

  handleInput = (e) => {
    user.setUserName(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="main-container">
      <div className="item-carousel-container mt-8 mb-4">
        <FoodItemsCarousel foodItems={foodItemsImageCards} />
      </div>
      <hr />
      <div className="search-bar-container flex justify-center mt-8">
        <input
          type="text"
          name="search"
          id="search"
          className="w-[514px] h-10 p-5 pl-4 text-base text-[#6c6c6c] rounded-tl-lg rounded-bl-lg border-2 border-solid border-[#d2d2d2] mr-0.5 focus:outline-none"
          placeholder="Search Restaurants..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        <input
          type="text"
          className="p-5 pl-3 border"
          value={user.loggedInUser}
          onChange={handleInput}
        />

        <button
          type="button"
          className="search-btn rounded-tr-lg rounded-br-lg text-[rgba(89,89,89,0.832)] pt-[6.5px] px-3 text-xs cursor-pointer border-2 border-solid border-[#dfdfdf] bg-[#eaeaea7e]"
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
      <div className="filters-container flex justify-center mt-4 mx-0 mb-6">
        <span
          className={
            "inline-block py-2 px-3 text-sm text-gray-500 border border-solid border-gray-300 rounded-3xl cursor-pointer " +
            (filterSelected ? "bg-gray-300 text-gray-600" : "")
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
        <div className="res-container flex flex-wrap gap-y-4 gap-x-7">
          {searchResultList.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
            >
              {!!restaurant.info.veg ? (
                <PureVegRestaurantCard resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;

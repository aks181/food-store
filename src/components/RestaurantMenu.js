import useRestaurantMenu from "../utils/hooks/useRestaurantMenu";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentRestaurant } from "../utils/restaurantInfoSlice";

const RestaurantMenu = () => {
  let params = useParams();

  let resInfo = useRestaurantMenu(params.id);
  console.log(resInfo?.cards[0]?.card?.card?.info, "resinfo");
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const restDetails = resInfo?.cards[0]?.card?.card?.info;
  //   console.log(restDetails);
  //   if (restDetails) {
  //     dispatch(setCurrentRestaurant(restDetails));
  //   }
  // }, [resInfo]);

  const [showCategoryItems, setShowCategoryItems] = useState(null);

  if (resInfo === null) {
    return <Shimmer />;
  }

  const {
    areaName,
    avgRating,
    costForTwoMessage,
    cuisines,
    name,
    sla,
    totalRatingsString,
  } = resInfo?.cards[0]?.card?.card?.info || {};

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (card) =>
        card?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  // console.log(categories, "Cat");
  // const { title, itemCards } = categories?.card?.card;

  return (
    <div className="restaurant-menu-container py-6 px-32">
      <div className="restaurant-details flex justify-between pb-4 border-b border-dashed border-b-[rgb(192,192,192)]">
        <div className="basic-details flex flex-col">
          <h3 className="mb-3 text-lg font-bold">{name}</h3>
          <small className="text-gray-600">{cuisines?.join(", ")}</small>
          <small className="text-gray-600">{areaName} </small>
        </div>
        <div className="ratings-reviews flex flex-col justify-between border border-solid border-[#dfdddd] rounded-lg p-2">
          <span className="border-b border-b-[#dfdfdf] pb-2 text-sm flex font-bold text-green-600">
            <i className="material-icons text-xl mr-1.5">star</i> {avgRating}
          </span>
          <small className="text-xs pt-2 font-bold tracking-tight text-[#707070]">
            {totalRatingsString}
          </small>
        </div>
      </div>
      <div className="sla-and-cost font-bold text-sm flex py-4 text-[#535151] items-center border-b border-b-[#c0c0c0b6]">
        <i className="material-icons mr-2">timer</i>
        <span className="mr-6">{sla?.deliveryTime} MINS</span>
        <i className="material-icons mr-2">payments</i>
        <span>{costForTwoMessage}</span>
      </div>

      {categories.map((category, index) => {
        return (
          <RestaurantCategory
            key={category?.card?.card?.title}
            category={category?.card?.card}
            showCategoryItems={showCategoryItems === index ? true : false}
            setShowCategoryItems={() => setShowCategoryItems(index)}
            restaurantDetails={resInfo?.cards[0]?.card?.card?.info}
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenu;

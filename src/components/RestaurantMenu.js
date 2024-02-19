import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { ITEM_IMAGE_URL, MENU_URL } from "../utils/constants";
import Veg_Icon from "../assets/veg.jpg";
import Nveg_Icon from "../assets/nveg.jpg";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  let params = useParams();

  const fetchData = async () => {
    const data = await fetch(MENU_URL + params.id);

    const json = await data.json();
    setResInfo(json.data);
    console.log(json.data);
  };

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
  } = resInfo?.cards[0]?.card?.card?.info;

  //   const { title, itemCards } =
  //     resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
  let rec_cards =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(
      (card) => card?.card?.card?.type === "CATEGORY_TYPE_RECOMMENDED"
    );
  const { title, itemCards } = rec_cards?.card?.card;
  //   console.log(
  //     resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(
  //       (card) => card?.card?.card?.title === "Recommended"
  //     )
  //   );

  return (
    <div className="restaurant-menu-container">
      <div className="restaurant-details">
        <div className="basic-details">
          <h3>{name}</h3>
          <small>{cuisines.join(", ")}</small>
          <small>{areaName} </small>
        </div>
        <div className="ratings-reviews">
          <span>
            <i className="material-icons">star</i> {avgRating}
          </span>
          <small>{totalRatingsString}</small>
        </div>
      </div>
      <div className="sla-and-cost">
        <i className="material-icons">timer</i>
        <span>{sla.deliveryTime} MINS</span>
        <i className="material-icons">payments</i>
        <span>{costForTwoMessage}</span>
      </div>

      <div className="food-menu">
        <div className="category-header">{title}</div>
        <div className="food-menu-items">
          {itemCards.map((item) => {
            const {
              id,
              isVeg,
              name,
              price,
              defaultPrice,
              description,
              imageId,
            } = item?.card?.info;
            return (
              <div key={id} className="food-menu-item">
                <div className="item-details">
                  {isVeg === 1 ? (
                    <img src={Veg_Icon} alt="veg" className="veg-icon" />
                  ) : (
                    <img src={Nveg_Icon} alt="non-veg" className="veg-icon" />
                  )}
                  <span className="item-name">{name}</span>
                  <span className="item-price">
                    ₹{price / 100 || defaultPrice / 100}
                  </span>
                  <span className="item-description">{description}</span>
                </div>
                <div className="item-image-cta">
                  <div className="image-container">
                    <img
                      src={ITEM_IMAGE_URL + imageId}
                      alt="item-img"
                      className="item-img"
                    />
                  </div>
                  <button type="button" className="item-add">
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default RestaurantMenu;

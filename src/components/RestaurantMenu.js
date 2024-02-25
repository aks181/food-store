import useRestaurantMenu from "../utils/hooks/useRestaurantMenu";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { ITEM_IMAGE_URL, MENU_URL } from "../utils/constants";
import Veg_Icon from "../assets/veg.jpg";
import Nveg_Icon from "../assets/nveg.jpg";

const RestaurantMenu = () => {
  let params = useParams();

  const resInfo = useRestaurantMenu(params.id);
  console.log(resInfo);

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
  } = resInfo?.cards[2]?.card?.card?.info;

  let rec_cards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(
      (card) => card?.card?.card?.type === "CATEGORY_TYPE_RECOMMENDED"
    );
  const { title, itemCards } = rec_cards?.card?.card;

  return (
    <div className="restaurant-menu-container py-6 px-32">
      <div className="restaurant-details flex justify-between pb-4 border-b border-dashed border-b-[rgb(192,192,192)]">
        <div className="basic-details flex flex-col">
          <h3 className="mb-3 text-lg font-bold">{name}</h3>
          <small className="text-gray-600">{cuisines.join(", ")}</small>
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
        <span className="mr-6">{sla.deliveryTime} MINS</span>
        <i className="material-icons mr-2">payments</i>
        <span>{costForTwoMessage}</span>
      </div>

      <div className="food-menu">
        <div className="category-header mt-6 font-bold text-base text-[#535151]">
          {title} ({itemCards.length})
        </div>
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
              <div
                key={id}
                className="food-menu-item flex justify-between py-6 border-b border-b-[#b6b6b691]"
              >
                <div className="item-details flex flex-col">
                  {isVeg === 1 ? (
                    <img src={Veg_Icon} alt="veg" className="veg-icon size-4" />
                  ) : (
                    <img
                      src={Nveg_Icon}
                      alt="non-veg"
                      className="veg-icon size-4"
                    />
                  )}
                  <span className="item-name text-base text-[#3e4152]">
                    {name}
                  </span>
                  <span className="item-price text-sm text-[#3e4152] mt-1">
                    ₹{price / 100 || defaultPrice / 100}
                  </span>
                  <span className="item-description text-xs tracking-tight mt-4 text-[#282c3f73]">
                    {description}
                  </span>
                </div>
                <div className="item-image-cta flex flex-col relative items-center">
                  <div className="image-container">
                    <img
                      src={ITEM_IMAGE_URL + imageId}
                      alt="item-img"
                      className="item-img w-[118px] h-24 border-2 border-[#d4d4d47c] rounded-md shadow-[3px_3px_4px_0_rgba(165,165,165,0.342)]"
                    />
                  </div>
                  <button
                    type="button"
                    className="item-add w-24 h-9 rounded-[4px] border border-[#00800093] text-green-600 font-bold absolute cursor-pointer bg-white -bottom-3 shadow-[1px_1px_6px_2px_#a5a5a557] hover:bg-green-600 hover:text-white"
                  >
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

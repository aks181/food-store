import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { cloudinaryImageId, name, avgRating, sla, cuisines, costForTwo } =
    props.resData.info;
  return (
    <div className="res-card w-[236px] border border-solid border-gray-300 rounded-2xl p-2 h-[95%] shadow-[3px_3px_4px_0_rgba(165,165,165,0.342)] mb-6 hover:scale-95 hover:origin-center hover:transition-all  ">
      <img
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
        className="res-logo w-full h-[170px] rounded-xl"
      />
      <div className="res-info flex flex-col">
        <p className="res-name font-bold">{name}</p>
        <div className="rating-and-tod flex justify-between">
          <span>{avgRating} ⭐</span>
          <span>{sla.slaString}</span>
        </div>
        <p className="cuisines text-gray-600 text-sm mb-2">
          {cuisines.join(", ")}
        </p>
        <span className="cost-for-two text-xs text-gray-400">{costForTwo}</span>
      </div>
    </div>
  );
};

//HOC
//RestaurantCard with Pure Veg label

export const withVegLabelRestaurantCard = (RestaurantCard) => {
  return (props) => {
    return (
      <>
        <span className="veg-label absolute bg-gradient-to-r from-[#1e5c1e] to-[#06b206f1] text-white px-2 py-[3px] rounded-xl ml-1 mt-1 z-10">
          Pure Veg
        </span>
        <RestaurantCard {...props} />
      </>
    );
  };
};

export default RestaurantCard;

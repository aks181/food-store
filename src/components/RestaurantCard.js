import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { cloudinaryImageId, name, avgRating, sla, cuisines, costForTwo } =
    props.resData.info;
  return (
    <div className="res-card">
      <img
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
        className="res-logo"
      />
      <div className="res-info">
        <p className="res-name">{name}</p>
        <div className="rating-and-tod">
          <span>{avgRating} ⭐</span>
          <span>{sla.slaString}</span>
        </div>
        <p className="cuisines">{cuisines.join(", ")}</p>
        <span className="cost-for-two">{costForTwo}</span>
      </div>
    </div>
  );
};

export default RestaurantCard;

import { ITEM_IMAGE_URL } from "../utils/constants";

const FoodItemCard = ({ imageId }) => {
  return (
    <div className="item-card px-5">
      <img
        src={ITEM_IMAGE_URL + imageId}
        alt={imageId.substring(
          imageId.lastIndexOf("/") + 1,
          imageId.indexOf(".png")
        )}
        className="min-w-[144px] h-[188px]"
      />
    </div>
  );
};

export default FoodItemCard;

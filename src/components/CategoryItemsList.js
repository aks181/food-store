import { useDispatch } from "react-redux";
import { ITEM_IMAGE_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
// import Veg from "../assets/veg.jpg";
// import Nveg from "../assets/nveg.jpg";
const veg = new URL("../assets/veg.jpg", import.meta.url);
const nveg = new URL("../assets/nveg.jpg", import.meta.url);

const CategoryItemsList = ({ items, restaurantDetails }) => {
  // console.log(items, "items");
  const dispatch = useDispatch();

  const handleAddItem = (addedItem) => {
    console.log(addedItem);
    dispatch(addItem([addedItem, restaurantDetails]));
  };

  return (
    <div className="food-menu-items px-2 ">
      {items.map((item) => {
        const { id, name, price, defaultPrice, isVeg, description, imageId } =
          item?.card?.info;
        return (
          <div
            key={id}
            className="food-menu-item flex justify-between py-6 border-b border-b-[#b6b6b691]"
          >
            <div className="item-details flex flex-col w-10/12">
              {isVeg === 1 ? (
                <img src={veg} alt="veg" className="veg-icon size-4" />
              ) : (
                <img src={nveg} alt="non-veg" className="veg-icon size-4" />
              )}
              <span className="item-name text-base text-[#3e4152]">{name}</span>
              <span className="item-price text-sm text-[#3e4152] mt-1">
                ₹{price / 100 || defaultPrice / 100}
              </span>
              <span className="item-description text-xs tracking-tight mt-4 text-[#282c3f73]">
                {description}
              </span>
            </div>
            <div className="item-image-cta flex flex-col relative items-center w-2/12">
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
                onClick={() => handleAddItem(item)}
              >
                <span>Add</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryItemsList;

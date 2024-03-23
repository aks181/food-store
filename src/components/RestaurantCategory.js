import { useState } from "react";
import CategoryItemsList from "./CategoryItemsList";

const RestaurantCategory = ({
  category,
  showCategoryItems,
  setShowCategoryItems,
}) => {
  //   console.log(props);
  //   const [showCategoryItems, setShowCategoryItems] = useState(true);
  const { title, itemCards } = category;

  const toggleItems = () => {
    setShowCategoryItems();
  };

  return (
    <div className="food-menu flex flex-col border-b-8 border-b-[#b6b6b691]">
      <div
        onClick={toggleItems}
        className="category-header mt-4 py-3 px-2 flex justify-between items-center cursor-pointer font-bold text-base text-[#535151]"
      >
        <span>
          {title} ({itemCards?.length})
        </span>
        <span className="relative top-[3px]">
          <i className="material-icons">expand_more</i>
        </span>
      </div>
      {showCategoryItems && <CategoryItemsList items={itemCards} />}
    </div>
  );
};

export default RestaurantCategory;

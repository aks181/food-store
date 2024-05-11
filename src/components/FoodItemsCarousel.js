import { useRef, useState } from "react";
import FoodItemCard from "./FoodItemCard";

const FoodItemsCarousel = ({ foodItems }) => {
  const [isDisabled, setIsDisabled] = useState({ left: true, right: false });
  const carouselRef = useRef(null);
  const sliderRow = carouselRef.current;

  const handleScroll = () => {
    if (sliderRow?.scrollLeft > 0) {
      setIsDisabled({ left: false });
      if (
        sliderRow?.scrollLeft + sliderRow?.clientWidth >
        sliderRow?.scrollWidth - 5
      ) {
        setIsDisabled({ right: true });
      }
    } else {
      setIsDisabled({ left: true, right: false });
    }
  };

  const scrollFoodItems = (direction) => {
    direction === "right"
      ? (sliderRow.scrollLeft += 820)
      : sliderRow.scrollTo(sliderRow.scrollLeft - 820, 0);
  };

  const btnCommonClass =
    "arrow-btn text-xl font-bold bg-gray-200 pt-1 pb-2 px-3 rounded-full ";
  return (
    <div className="relative">
      <p className="font-bold text-gray-700 text-xl">What's on your mind?</p>
      <div className="arrow-btn-container absolute top-2 right-3">
        <span
          className={
            btnCommonClass +
            " mr-2 " +
            (isDisabled.left === true
              ? "opacity-50 cursor-default"
              : "cursor-pointer")
          }
          onClick={() => scrollFoodItems("left")}
        >
          &#8678;
        </span>
        <span
          className={
            btnCommonClass +
            (isDisabled.right === true
              ? " opacity-50 cursor-default"
              : "cursor-pointer")
          }
          onClick={() => scrollFoodItems("right")}
        >
          &#8680;
        </span>
      </div>
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="image-cards-row overflow-x-scroll flex py-4 no-scroll"
      >
        {foodItems.map((item) => {
          return <FoodItemCard key={item.id} imageId={item.imageId} />;
        })}
      </div>
    </div>
  );
};

export default FoodItemsCarousel;

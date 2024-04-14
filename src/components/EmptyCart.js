import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <img
        src="https://img.freepik.com/free-vector/supermarket-shopping-cart-concept-illustration_114360-22408.jpg"
        alt="empty-cart-image"
        width="300px"
        height="300px"
        className="mb-4"
      />
      <span className="text-red-700 font-bold text-lg mb-8">
        Your cart is empty :(
      </span>
      <Link to="/">
        <span className="uppercase py-2 px-3 bg-orange-600 text-white font-bold rounded-md cursor-pointer hover:bg-orange-500">
          See Nearby Restaurants
        </span>
      </Link>
    </div>
  );
};

export default EmptyCart;

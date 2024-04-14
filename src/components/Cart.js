import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import {
  addItem,
  clearCart,
  decreaseItem,
  deleteItem,
} from "../utils/cartSlice";
import EmptyCart from "./EmptyCart";

const veg = new URL("../assets/veg.jpg", import.meta.url);
const nveg = new URL("../assets/nveg.jpg", import.meta.url);

const Cart = () => {
  const items = useSelector((store) => store.cart.items);
  console.log(items, "items");
  const currentRestaurant = useSelector(
    (store) => store.currentRestaurant.currentRestaurant
  );
  console.log(currentRestaurant, "currentRestro");
  const dispatch = useDispatch();
  deleteCartItem = (itemId) => {
    dispatch(deleteItem(itemId));
  };

  clearCartItems = () => {
    dispatch(clearCart());
  };

  function getItemsTotal() {
    let allItemPrice = 0;
    items.forEach((item) => {
      const itemPrice =
        item.item.card.info.price / 100 ||
        item.item.card.info.defaultPrice / 100;
      const totalItemPrice = itemPrice * item.quantity;
      allItemPrice += totalItemPrice;
    });
    return allItemPrice;
  }

  getExtraCharges = (itemsTotalPrice) => {
    let charges = itemsTotalPrice * 0.05;
    return +charges.toFixed(2);
  };

  increaseItem = (item) => {
    dispatch(addItem(item.item));
  };

  decreaseItemCount = (itemId) => {
    dispatch(decreaseItem(itemId));
  };

  return (
    <div className="cart-container flex justify-center mt-6">
      {!items?.length ? (
        <EmptyCart />
      ) : (
        <div className="order-summary w-2/3 bg-gray-100 rounded-md shadow-md p-4">
          <div className="text-center">
            <span className="font-bold text-xl text-center">Order Summary</span>
          </div>
          <hr className="my-3" />
          <div className="flex mb-6 px-4">
            <img
              src={CDN_URL + currentRestaurant[0]?.cloudinaryImageId}
              alt="res-logo"
              className="res-logo w-[56px] h-[56px] rounded-sm"
            />
            <div className="flex flex-col ml-3 border-b-2 w-full border-b-gray-700">
              <span className="font-semibold">
                {currentRestaurant[0]?.name}
              </span>
              <span className="text-gray-600 capitalize">
                {currentRestaurant[0]?.areaName}
              </span>
            </div>
          </div>

          <div className="items-summary flex flex-col px-4">
            {items.map((item) => {
              const { id, name, price, defaultPrice, isVeg } =
                item?.item?.card?.info;
              return (
                <div
                  key={id}
                  className="item-row flex justify-between mb-3 px-2 items-center"
                >
                  <div className="flex items-center w-9/12">
                    <span className="mr-1.5">
                      {isVeg === 1 ? (
                        <img
                          src={veg}
                          alt="veg"
                          className="veg-icon size-4 min-w-4"
                        />
                      ) : (
                        <img
                          src={nveg}
                          alt="non-veg"
                          className="veg-icon size-4 min-w-4"
                        />
                      )}
                    </span>
                    <span className="text-sm pr-3">{name}</span>
                  </div>
                  <div className="w-3/12 flex justify-between items-center">
                    <div className="flex items-center border border-gray-200 px-1.5 bg-white">
                      <i
                        onClick={() => decreaseItemCount(id)}
                        className="material-icons !text-base !font-bold mr-1.5 text-red-600 cursor-pointer"
                      >
                        remove
                      </i>
                      {item.quantity}
                      <i
                        onClick={() => increaseItem(item)}
                        className="material-icons !text-base !font-bold ml-1.5 text-green-600 cursor-pointer"
                      >
                        add
                      </i>
                    </div>
                    <div>
                      ₹
                      {(item.quantity * price) / 100 ||
                        (item.quantity * defaultPrice) / 100}
                    </div>
                    <button
                      type="button"
                      className="-mb-1.5"
                      onClick={() => deleteCartItem(id)}
                    >
                      <i className="material-icons text-red-600">delete</i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <hr className="my-3" />
          <div className="flex justify-around">
            <span className="inline-block px-4 py-2 rounded-xl bg-gray-200 shadow-lg text-gray-700 font-bold cursor-pointer hover:bg-gray-400 hover:text-white">
              <Link to={"/restaurant/" + currentRestaurant[0]?.id}>
                {" "}
                Add more items
              </Link>
            </span>
            <span
              onClick={() => clearCartItems()}
              className="inline-block px-4 py-2 rounded-xl bg-gray-200 shadow-lg text-gray-700 font-bold cursor-pointer hover:bg-gray-400 hover:text-white"
            >
              Clear cart
            </span>
          </div>
          <hr className="my-3" />
          <div className="px-4">
            <input
              type="checkbox"
              name="contactless"
              id="contactless"
              className="size-4 mr-3"
            />
            <span className="font-semibold inline-block">
              Ask restaurant not to send cutlery
            </span>
            <small className="text-gray-500 ml-7 block">
              Help the planet towards a greener future with this small step.
            </small>
          </div>
          <hr className="my-3" />
          <div className="px-4">
            <span className="font-bold">Bill Details</span>
            <div className="flex justify-between">
              <span>Item Total</span>
              <span>₹{getItemsTotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>GST and Restaurant Charges (5%)</span>
              <span>₹{getExtraCharges(getItemsTotal())}</span>
            </div>
            <div className="flex justify-between border-b-2 border-b-black pb-2">
              <span>Delivery Fee</span>
              <span>₹{currentRestaurant[0].sla.lastMileTravel * 10}</span>
            </div>
            <div className="flex justify-between my-3 font-semibold">
              <span className="">To Pay</span>
              <span>
                ₹
                {getItemsTotal() +
                  getExtraCharges(getItemsTotal()) +
                  currentRestaurant[0].sla.lastMileTravel * 10}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

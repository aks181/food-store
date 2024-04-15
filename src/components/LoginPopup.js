import { useState } from "react";
import OtpInput from "./OtpInput";

const LoginPopup = ({ closePopup }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showNumberError, setShowNumberError] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleRequestOtp = () => {
    const regex = /^[1-9][0-9]{9}$/;
    if (regex.test(mobileNumber)) {
      setShowNumberError(false);
      setShowOtpInput(true);
    } else {
      setShowNumberError(true);
    }
  };

  const handleOtpSubmit = () => {
    console.log("OTP submitted");
  };

  return (
    <>
      <div
        className="body-overlay fixed top-0 right-0 bottom-0 left-0 bg-zinc-800/75 z-20"
        onClick={() => closePopup(false)}
      ></div>
      <div className="popup-container w-[760px] h-[500px] fixed z-30 top-1/2 left-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg">
        <div className="popup-body flex h-full">
          <div className="popup-lhs p-10 w-5/12 bg-gradient-to-b from-[#b4a92e] to-[#67973a]">
            <div className="flex flex-col justify-between h-full">
              <span className="inline-flex flex-col">
                <span className="text-3xl text-white mb-3">Login</span>
                <span className="text-lg text-gray-200">
                  Get access to your cart, orders and recommendations.
                </span>
              </span>
              <img
                src="https://www.foodchow.com/blog/wp-content/uploads/2021/03/missing-order.jpg"
                alt="login-img"
                width="300px"
                height="150px"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="popup-rhs p-10 pr-14 w-7/12 bg-slate-100 relative">
            <span
              className="font-bold text-3xl text-gray-700 cursor-pointer absolute top-2 right-4"
              onClick={() => closePopup(false)}
            >
              &times;
            </span>
            {showOtpInput ? (
              <OtpInput
                mobileNumber={mobileNumber}
                digits={6}
                handleOtpSubmit={handleOtpSubmit}
              />
            ) : (
              <div>
                <div className="input-container w-full relative">
                  <label htmlFor="number" className="text-base text-gray-700">
                    Enter your mobile number:{" "}
                  </label>
                  <input
                    type="text"
                    name="number"
                    id="number"
                    value={mobileNumber}
                    placeholder="9876543210"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="mt-1 bg-transparent border-b text-lg border-gray-300 focus:border-gray-600 w-full focus:outline-none"
                  />
                  {showNumberError ? (
                    <small className="text-red-500 absolute top-14 left-0">
                      Please enter a valid mobile number.
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <p className="mt-8 text-[11px] text-gray-700">
                  By continuing, you agree to our{" "}
                  <span className="text-blue-600"> Terms of Use</span> and{" "}
                  <span className="text-blue-600">Privacy Policy.</span>
                </p>

                <div
                  onClick={handleRequestOtp}
                  className="text-white bg-orange-600 font-bold text-center py-3 rounded mt-3 cursor-pointer"
                >
                  Request OTP
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;

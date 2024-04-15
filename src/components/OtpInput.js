import { useEffect, useRef, useState } from "react";

const OtpInput = ({ mobileNumber, digits = 6, handleOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(digits).fill(""));
  const inputRefs = useRef([]);

  const handleOtpSubmits = () => {
    console.log(otp.join(""));
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (i, e) => {
    const value = e.target.value;
    const regex = /^[0-9]+$/;
    isValidValue = regex.test(value) || value === "";
    if (!isValidValue) return; // allow only number input

    const newOtp = otp.map((x, index) => {
      if (i === index) {
        x = e.target.value.substring(e.target.value.length - 1);
        if (value && i < digits - 1) {
          inputRefs.current[i + 1].focus(); //move focus forward to next field
        }
        return x;
      } else return x;
    });
    setOtp(newOtp);

    //another way to do this
    // const value = e.target.value;
    // if (isNaN(value)) return;
    // const newOtp = [...otp];
    // // allow only one input
    // newOtp[i] = value.substring(value.length - 1);
    // setOtp(newOtp);

    // if (value && i < digits - 1) {
    //   inputRefs.current[i + 1].focus();
    // }
  };

  const handleInputClick = (i) => {
    //move cursor at the end of string in input box
    inputRefs.current[i].setSelectionRange(1, 1);
  };

  const handleInputKeyDown = (i, e) => {
    //moving focus to previous field on backspace
    if (e.key === "Backspace" && i > 0 && !otp[i]) {
      inputRefs.current[i - 1].focus();
    }
  };

  return (
    <div>
      <label className="text-base block text-gray-700">
        Enter OTP sent at <strong>{mobileNumber}</strong> to continue:
      </label>
      {otp.map((digit, index) => {
        return (
          <input
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            type="text"
            name="otp"
            value={digit}
            onChange={(e) => handleInputChange(index, e)}
            onClick={() => handleInputClick(index)}
            onKeyDown={(e) => handleInputKeyDown(index, e)}
            className="mt-4 inline-block text-center w-12 h-14 mr-[9px] bg-transparent border text-lg border-gray-300 focus:border-gray-600 rounded-md focus:outline-none focus:shadow-md"
          />
        );
      })}

      <div
        onClick={handleOtpSubmits}
        className="text-white bg-blue-500 font-bold text-center py-3 rounded mt-6 cursor-pointer"
      >
        Verify
      </div>
    </div>
  );
};

export default OtpInput;

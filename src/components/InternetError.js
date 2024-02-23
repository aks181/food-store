import NetworkErrorImg from "../assets/network.jpg";

const InternetError = () => {
  return (
    <div className="no-internet-error-container">
      <img
        src={NetworkErrorImg}
        alt="No Internet Error"
        width="280px"
        height="280px"
      />
      <h3> Uh..Oh. Seems your internet is not connected.</h3>
      <h5>Please check and try again.</h5>
    </div>
  );
};

export default InternetError;

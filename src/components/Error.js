// const imageURL = new URL("../assets/invalidUrl.jpg", import.meta.url);
import Logo from "../assets/invalidUrl.jpg";
import { useRouteError } from "react-router-dom";

const Error = () => {
  let error = useRouteError();

  return (
    <div className="error-container">
      <img src={Logo} alt="invalid-URL" className="error-img" />
      <h3 className="error-headline">Oops..!! We ran into an error.</h3>
      <h4 className="error-headline">Was the URL right?</h4>
      <h5>
        {error.status} : {error.statusText}
      </h5>
      <h6>{error.data}</h6>
    </div>
  );
};

export default Error;

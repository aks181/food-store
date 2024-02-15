const imageURL = new URL("../assets/invalidUrl.jpg", import.meta.url);
const Error = () => {
  return (
    <div className="error-container">
      <img src={imageURL} alt="invalid-URL" className="error-img" />
      <h3 className="error-headline">Oops..!! We ran into an error.</h3>
      <h4 className="error-headline">Was the URL right?</h4>
    </div>
  );
};

export default Error;

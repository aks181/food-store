import User from "./User";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <h2>Food delivery app</h2>
      <h3>Meet our team</h3>
      <User name={"Akshay updated"} location={"Pallavpuram"} />
    </div>
  );
};

export default AboutUs;

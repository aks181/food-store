import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Error from "./components/Error";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const appRoutes = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    errorElement: <Error />,
  },
  {
    path: "/about",
    Component: AboutUs,
  },
  {
    path: "/contact",
    Component: Contact,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);

import React, { useEffect } from "react";
import Banner from "../../components/Banner";
import Catagories from "./Catagories";
import SpecialDishes from "./SpecialDishes";
import Testimonials from "./Testimonials";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Banner />
      <Catagories />
      <SpecialDishes />
      <Testimonials />
    </>
  );
}

export default Home;

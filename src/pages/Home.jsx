import Banner from "../component/Banner";
import create from "../assets/register_banner_home.webp";
import Banner2 from "../component/Banner2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HotGames from "./HotGames/HotGames";
import CategoryMobile from "../component/CategoryMobile";
import UserDetails from "../component/MobileResponsive/UserDetails";
import MobileBanner from "../component/MobileResponsive/MobileBanner";
import Loader from "../Layout/Loader";
import { useEffect, useState } from "react";
import BannerPopup from "../assets/banner/Pop-Up-Banner.webp";
import { AiOutlineClose } from "react-icons/ai";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupFlag = localStorage.getItem("showPopup");
    if (popupFlag === "true") {
      setShowPopup(true);
      localStorage.removeItem("showPopup"); // Reset the flag
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.Auth.token);
  return (
    <div>
      <Loader></Loader>
      <div className="lg:flex hidden">
        <Banner />
      </div>
      <div className="lg:hidden">
        <MobileBanner></MobileBanner>
      </div>
      <div className="md:w-10/12 mx-auto my-5">
        <div className="bg-[#2d394b] text-white p-2 px-2 font-semibold rounded-3xl">
          <marquee behavior="" direction="">
            স্ক্যাম সতর্কতা -:প্রিয় সদস্যরা, আপনার অ্যাকাউন্ট সুরক্ষিত নিশ্চিত
            করতে দয়া করে আপনার লগইন ডিটেলস , অর্থপ্রদানের রসিদ(ক্যাশ আউট এর ছবি
            ) এবং ওটিপি কারও সাথে শেয়ার করবেন না। আপনার যদি সহায়তার প্রয়োজন
            হয়, তাহলে লাইভচ্যাটের মাধ্যমে আমাদের সাথে যোগাযোগ করুন।RANIBAJI-এ
            স্বাগতম -:বাংলাদেশের #1 ক্রিকেট এক্সচেঞ্জ এবং বেটিং প্ল্যাটফর্ম
          </marquee>
        </div>
        {!isLoggedIn && (
          <div
            onClick={() => navigate("/registration")}
            className="cursor-pointer mt-3"
          >
            <img src={create} alt="" />
          </div>
        )}
        <UserDetails></UserDetails>
        <CategoryMobile />
        <HotGames />
        <div className="mt-4">
          <Banner2 />
        </div>
        {/* <div className="flex my-4  gap-4">
          <div>
            <img className="md:h-40 h-20 w-full " src={img} alt="" />
          </div>
          <div>
            <img className="md:h-40 h-20 w-full" src={img2} alt="" />
          </div>
        </div> */}
      </div>
      {showPopup && (
        <div className="fixed bg-[#2d394b] inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#2d394b] w-full max-w-md rounded-lg shadow-lg relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <AiOutlineClose size={24} />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <img
                className="rounded-md"
                src={BannerPopup}
                alt="Banner Popup"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShowToast from "../../component/Toastfy/ShowToast";
import { useDispatch } from "react-redux";
import { CreateUser } from "../../component/Redux/ReduxFunction";
import { Helmet } from "react-helmet";
import img from "../../assets/ranibajibd.png";
import Loader from "../../Layout/Loader";

const Registration = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState(false);
  const [passwordNote, setPasswordNote] = useState("");
  const [checked, setChecked] = useState(false);
  const [register, setRegister] = useState("Registration");
  const [usedReferralCode, setUsedReferralCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract referral code from query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("promocode");
    if (code) {
      setUsedReferralCode(code);
    }
  }, [location.search]);

  const handlePassword = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.value;
    if (password !== confirmPassword) {
      setPasswordNote("Your password doesn't match yet");
    } else {
      setPasswordNote("");
      setPassword(true);
    }
  };

  const handleRegistration = async (e) => {
    setRegister("loading...");
    e.preventDefault();
    const form = e.target;

    const userName = form.name.value;
    const primaryPhone = form.number.value;
    const password = form.password.value;
    const currency = form.currency.value;

    const data = {
      userName,
      primaryPhone,
      password,
      currency,
      usedReferralCode,
    };

    dispatch(CreateUser({ data })).then((res) => {
      if ("error" in res && res.error) {
        ShowToast({ error: res.error.message });
        setRegister("Register");
      }
      if ("payload" in res && res.payload) {
        ShowToast({ success: "User Created Successfully" });
        setRegister("Register");
        navigate("/login");
      }
    });
  };

  return (
    <section className="bg-[#2d394b] p-2">
      <Loader />
      <Helmet>
        <title>Sign Up | Ranibaji</title>
        <meta
          name="description"
          content="Live hot games and more. Best odds and real-time updates!"
        />
        <meta
          name="keywords"
          content="sports betting, live casino, live betting, cricket odds, football odds"
        />
        <link rel="canonical" href="https://ranibaji.com/registration" />
      </Helmet>
      <div className="py-5 text-white">
        <img className="w-48 mx-auto" src={img} alt="logo" />
        <h1 className="text-3xl font-bold text-center my-2">
          Create an account
        </h1>
      </div>
      <div className="rounded-xl">
        <form
          onSubmit={handleRegistration}
          className="text-black space-y-5 bg-white rounded-xl lg:w-1/2 md:w-4/6 w-full mx-auto py-10 border-2 px-4 sm:px-8"
        >
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Your Username
            </label>{" "}
            <br />
            <input
              type="text"
              name="name"
              placeholder="Write your name here"
              required
              className="border-2 bg-white p-2 border-gray-400 w-full rounded-lg"
            />
          </div>
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Phone Number
            </label>{" "}
            <br />
            <input
              type="text"
              name="number"
              placeholder="Write your number here"
              required
              className="border-2 bg-white p-2 border-gray-400 w-full rounded-lg"
            />
          </div>
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Currency
            </label>{" "}
            <br />
            <select
              name="currency"
              placeholder="Write your number here"
              required
              className="border-2 bg-white p-2 border-gray-400 w-full rounded-lg"
            >
              <option value="BDT">BDT</option>
              <option value="INR">INR</option>
              <option value="BRL">BRL</option>
            </select>
          </div>
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Referral Code
            </label>{" "}
            <br />
            <input
              type="text"
              name="usedReferralCode"
              value={usedReferralCode}
              onChange={(e) => setUsedReferralCode(e.target.value)}
              placeholder="Enter referral code (optional)"
              className="border-2 bg-white p-2 border-gray-400 w-full rounded-lg"
            />
          </div>
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Password
            </label>{" "}
            <br />
            <input
              type="password"
              name="password"
              placeholder="Write your password here"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-2 bg-white p-2 border-gray-400 w-full rounded-lg"
            />
          </div>
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Confirm Your Password
            </label>{" "}
            <br />
            <input
              type="password"
              placeholder="Confirm your password here"
              required
              onChange={handlePassword}
              className="border-2 bg-white p-2 border-gray-400 w-full rounded-lg"
            />{" "}
            <br />
            <span className="font-semibold text-red-600">{passwordNote}</span>
          </div>
          <div className="w-full bg-white">
            <input
              type="checkbox"
              onChange={() => setChecked(!checked)}
              className="mr-2"
            />
            <span>
              By clicking the register button, I hereby acknowledge that I am
              over 18 years of age and have read and accepted your terms and
              conditions.
            </span>
          </div>
          <button
            disabled={password === true && checked === true ? false : true}
            className="border px-5 py-2 mb-8 w-full rounded-md font-bold bg-[#2d394b] text-white"
          >
            {register}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Registration;

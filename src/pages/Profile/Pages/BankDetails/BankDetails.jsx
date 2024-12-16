import React from "react";
import Loader from "../../../../Layout/Loader";

const BankDetails = () => {
  return (
    <section className="px-10 py-5">
      <Loader></Loader>
      <h1 className="text-3xl font-semibold mt-5">Bank Details</h1>
      <form action="" className="relative left-10 top-10 space-y-3 w-80 ">
        <div>
          <label htmlFor="" className="text-lg">
            Bank <span className="text-lg text-red-500">*</span>
          </label>{" "}
          <br />
          <select
            name=""
            className="p-2 rounded-xl w-full border-2 border-gray-300"
            id=""
          >
            <option value="another-bank">Another Bank</option>
          </select>
        </div>
        <div>
          <label htmlFor="" className="text-lg">
            Bank Name <span className="text-lg text-red-500">*</span>
          </label>{" "}
          <br />
          <input
            type="text"
            className="p-2 rounded-xl border-2 w-full border-gray-300"
            required
          />
        </div>
        <div>
          <label htmlFor="" className="text-lg">
            Account Name <span className="text-lg text-red-500">*</span>
          </label>{" "}
          <br />
          <input
            type="text"
            className="p-2 rounded-xl border-2 w-full border-gray-300"
            required
          />
        </div>
        <div>
          <label htmlFor="" className="text-lg">
            Account Number <span className="text-lg text-red-500">*</span>
          </label>{" "}
          <br />
          <input
            type="text"
            className="p-2 rounded-xl border-2 w-full border-gray-300"
            required
          />
        </div>
        <div>
          <button className="w-full py-2 text-center text-lg font-bold bg-primary rounded-lg">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default BankDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const index = () => {
  const URL = "https://restcountries.com/v3.1";
  const [countries, setCountries] = useState([]);
  const { id } = useParams();
  const str = id.split("-").join(" ");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${URL}/name/${str}?fullText=true`)
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.log("Error:", error));
  }, []);
  console.log(countries[0]);
  return (
    <>
      <div className="flex justify-center">
        <button
          className="mt-[100px] border-solid rounded-md hover:bg-gray-50 px-5 py-3 border-[1.5px] border-black"
          onClick={() => navigate("/")}
        >
          ⟪ Back
        </button>
      </div>
      <section className="w-full flex justify-center gap-[50px] items-center pt-[50px] max-w-[1160px] mx-auto">
        <div>
          <img
            className="w-[500px] object-contain"
            src={countries[0]?.flags?.png}
            alt=""
          />
        </div>
        <div>
          <h2 className="text-[32px] font-bold">
            {countries[0]?.name?.common}
          </h2>
          <p className="text-[18px] font-sans">
            Region:{" "}
            <span className="text-orange-800 text-[16px]">
              {" "}
              {countries[0]?.region}
            </span>
          </p>
          <p className="text-[18px] font-sans">
            Capital:
            <span className="text-orange-800 text-[16px]">
              {" "}
              {countries[0]?.capital}
            </span>
          </p>
          <p className="text-[18px] font-sans">
            Languages:
            <span className="text-orange-800 text-[16px]">
              {" "}
              {countries[0]?.languages?.eng}
            </span>
          </p>
          <p className="text-[18px] font-sans">
            Start ofWeek:
            <span className="text-orange-800 text-[16px]">
              {" "}
              {countries[0]?.startOfWeek}
            </span>
          </p>
          <p className="text-[18px] font-sans">
            Official:
            <span className="text-orange-800 text-[16px]">
              {" "}
              {countries[0]?.name?.official}
            </span>
          </p>
          <p className="text-[18px] font-sans">
            Population:
            <span className="text-orange-800 text-[16px]">
              {countries[0]?.population}
            </span>
          </p>
          <p className="text-[18px] font-sans">
            Status:
            <span className="text-orange-800 text-[16px]">
              {countries[0]?.status}
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default index;

import React, { useRef } from "react";
import { HiSearch } from "react-icons/hi";
import { MdOutlineArrowBackIos } from "react-icons/md";

const API_KEY = "3b1f160a4eac4ab181f222150230103";

export default function SearchBox({
  setWeatherData,
  setCountrySelected,
  countrySelected,
  setSearchInputData,
}) {
  const searchRef = useRef();

  function checkWeather() {
    const name = searchRef.current.value;
    if (name === "") {
      setWeatherData({});
      setCountrySelected(false);
      return;
    }
    setCountrySelected(true);

    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${name}&aqi=no`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setWeatherData(data);
      })
      .catch((err) => console.log("ERROR"));
  }

  function keyboardSubmit(e) {
    if (e.key === "Enter") checkWeather();
  }

  function clearInput() {
    searchRef.current.value = "";
    setWeatherData({});
    setCountrySelected(false);
  }

  return (
    <div className="flex justify-around gap-2 lg:w-1/3 self-center">
      <input
        className="text-lg p-2 rounded-2xl border-gray-400 border-2"
        type="text"
        ref={searchRef}
        placeholder="Nazwa miejscowości"
        onKeyDown={keyboardSubmit}
        onChange={() => setSearchInputData(searchRef.current.value)}
        id="searchInput"
      />
      <button
        className="bg-gray-900 p-4 rounded-full text-white text-xl active:scale-110 hover:bg-gray-600 transition-all duration-400 ease-out"
        onClick={checkWeather}
        id="searchButton"
      >
        {<HiSearch />}
      </button>
      {countrySelected ? (
        <button
          className="bg-gray-900 p-4 rounded-full text-white text-xl active:scale-110 hover:bg-gray-600 transition-all duration-400 ease-out"
          onClick={clearInput}
          id="returnButton"
        >
          {<MdOutlineArrowBackIos />}
        </button>
      ) : null}
    </div>
  );
}

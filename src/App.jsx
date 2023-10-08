import { useEffect, useState, useRef } from "react";
import "./index.css";
import SearchBox from "./SearchBox";
import WeatherDisplay from "./WeatherDisplay";

function App() {
  const [countryData, setCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [searchInputData, setSearchInputData] = useState("");
  const [countrySelected, setCountrySelected] = useState(false);
  const displayAnimation = useRef();

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/independent?status=true&fields=name,capital,flags,population"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCountryData(data);
        }
      })
      .catch((error) => console.log("ERROR COUNTRY"));
  }, []);

  useEffect(() => {
    if (countrySelected) {
      setWeatherData({});
      setCountrySelected(false);
    }
  }, [searchInputData]);

  return (
    <div className="w-full h-full p-10 flex flex-col gap-2">
      <SearchBox
        setWeatherData={setWeatherData}
        setCountrySelected={setCountrySelected}
        countrySelected={countrySelected}
        setSearchInputData={setSearchInputData}
      />
      {countryData ? (
        <WeatherDisplay
          weatherData={weatherData}
          countryData={countryData}
          countrySelected={countrySelected}
        />
      ) : null}
    </div>
  );
}

export default App;

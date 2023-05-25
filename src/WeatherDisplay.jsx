import { useEffect, useState } from "react";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FiWind } from "react-icons/fi";

function WeatherIcon({ icon, name }) {
  return (
    <div className="WeatherIcon flex flex-col items-center justify-between">
      {icon}
      <h1 className="w-full text-center font-bold">{name}</h1>
    </div>
  );
}

export default function WeatherDisplay({ weatherData }) {
  const loc = weatherData.location;
  const data = weatherData.current;

  function showWeatherInfo() {
    if (!data) return;
    return (
      <>
        <WeatherIcon
          icon={<img src={data.condition.icon} alt="Icon" />}
          name={data.condition.text}
        />
        <WeatherIcon
          icon={<TbTemperatureCelsius size="50" />}
          name={data.temp_c}
        />
        <WeatherIcon
          icon={<FiWind size="50" />}
          name={Math.floor(data.wind_kph) + " km/h"}
        />
      </>
    );
  }

  return (
    <div className="WeatherDisplay flex flex-col gap-10 mx-auto">
      <div className="LocationInfo lg:w-1/3 font-bold">
        <h1 className="text-5xl md:text-6xl lg:text-8xl">
          {loc ? loc.country : null}
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl">
          {loc ? loc.name : null}
        </h2>
      </div>

      <div className="WeatherInfo flex justify-between gap-12">
        {showWeatherInfo()}
      </div>
    </div>
  );
}

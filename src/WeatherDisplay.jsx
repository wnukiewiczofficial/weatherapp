import { TbTemperatureCelsius } from "react-icons/tb";
import CountryTable from "./CountryTable";

function WeatherIcon({ unit, value, name }) {
  return (
    <div className="flex flex-col w-full lg:w-1/2 items-center">
      <span className="text-4xl">{name}</span>
      <h1 className="text-2xl font-bold flex items-center gap-2">
        {value}
        {unit ? unit : null}
      </h1>
    </div>
  );
}

export default function WeatherDisplay({ weatherData, countryData }) {
  const loc = weatherData.location;
  const data = weatherData.current;

  function showWeatherInfo() {
    if (!data) return;
    return (
      <div className="flex flex-col lg:flex-row lg:flex-wrap w-full items-center justify-center gap-6 lg:gap-0 lg:gap-y-8">
        <WeatherIcon value={data.condition.text} name="Weather" />
        <WeatherIcon
          unit={<TbTemperatureCelsius size={30} />}
          value={data.temp_c}
          name="Temperature"
        />
        <WeatherIcon
          value={Math.floor(data.wind_kph) + " km/h"}
          name="Wind velocity"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full lg:w-3/4 self-center items-center h-full gap-10 p-4">
      {data ? (
        <div className="flex flex-col lg:flex-row w-full h-full pt-8 lg:pt-0 gap-12 lg:gap-0 items-center">
          <div className="flex flex-col items-center lg:items-start w-full font-bold">
            <h1 className="text-8xl">{loc ? loc.country : null}</h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl flex flex-col lg:flex-row items-center">
              {loc ? loc.name : null}
              {data ? (
                <img src={data.condition.icon} alt="Condition icon" />
              ) : null}
            </h2>
          </div>
          {showWeatherInfo()}
        </div>
      ) : (
        // <h1 className="m-auto text-5xl">Nie wybrano miejscowości</h1>
        <CountryTable countries={countryData} />
      )}
    </div>
  );
}

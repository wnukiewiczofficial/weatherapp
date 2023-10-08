import React from "react";

export default function CountryTable({ countries }) {
  return (
    <table className="flex w-full h-full">
      <tbody className="flex flex-col items-center w-full gap-4">
        {countries
          .flat()
          .sort((c1, c2) => c2.population - c1.population)
          .filter((c) => {
            if (document.querySelector("#searchInput").value === "") return c;
            else {
              return (
                c.name.common.includes(
                  document.querySelector("#searchInput").value
                ) ||
                c.capital[0].includes(
                  document.querySelector("#searchInput").value
                )
              );
            }
          })
          .map((country, i) => {
            return (
              <tr
                className="flex w-full lg:w-1/3 gap-4 rounded-xl items-center cursor-pointer hover:bg-gray-800 hover:text-white p-2 transition"
                key={i}
                onClick={() => {
                  document.querySelector("#searchInput").value =
                    country.capital[0];
                  document.querySelector("#searchButton").click();
                }}
              >
                <td>
                  <img
                    className="w-16 rounded-xl"
                    src={country.flags.svg}
                    alt={country.flags.alt}
                  />
                </td>
                <td className="text-xl">{country.name.common}</td>
                <td className="text-sm">{country.capital[0]}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

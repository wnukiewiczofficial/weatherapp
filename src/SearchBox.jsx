import React, { useRef } from 'react'

export default function SearchBox({setWeatherData}) {
    const searchRef = useRef();
    
    function checkWeather(){
        const name = searchRef.current.value;
        if(name === "") return; 
        searchRef.current.value = "";

        fetch(`https://api.weatherapi.com/v1/current.json?key=3b1f160a4eac4ab181f222150230103&q=${name}&aqi=no`)
          .then(res => res.json())
          .then(data => {
            if(!data.error) setWeatherData(data);
          }).catch(err => console.log("ERROR"));

          
    }

    function keyboardSubmit(e){
        if(e.key === "Enter") checkWeather();
    }

    return (
        <div className='flex flex-col gap-2'>
            <h1 className='text-xl lg:text-3xl'>Choose location...</h1>
            <input className='text-xl p-4' type="text" ref={searchRef} placeholder="Place name" onKeyDown={keyboardSubmit} />
            <button className='bg-gray-900 w-full rounded-xl text-center text-white text-xl hover:bg-gray-600' onClick={checkWeather}>Check</button>
        </div>
    )
}

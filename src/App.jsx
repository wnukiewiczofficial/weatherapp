import { useEffect, useState, useRef } from 'react'
import './index.css'
import SearchBox from './SearchBox';
import WeatherDisplay from './WeatherDisplay';
import anime from 'animejs/lib/anime.es.js';


function App() {
  const [weatherData, setWeatherData] = useState({});
  const displayAnimation = useRef();
  
  useEffect(() => {
    displayAnimation.current = anime.timeline({autoplay: false, loop: false});

    displayAnimation.current.add({
      targets: ".LocationInfo",
      translateY: ["-50vh", 0],
      duration: 600,
      easing: "easeOutSine"
    }).add({
      targets: ".WeatherInfo > div",
      scale: [0, 1],
      duration: 200,
      delay: anime.stagger(100, {grid: [3, 1], from: "center"}),
      easing: "spring"
    })
  }, [])

  useEffect(() => {
    if(!weatherData) return;
    displayAnimation.current.play();
  }, [weatherData])

  return (
    <div className='w-full h-full p-10 flex flex-col gap-12 items-center'>
      <WeatherDisplay weatherData={weatherData} />
      <SearchBox setWeatherData={setWeatherData} />
    </div>
  )
}

export default App

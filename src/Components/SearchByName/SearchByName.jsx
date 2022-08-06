import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WOW from 'wowjs';

function SearchByName() {
  const [weatherData, setWeatherData] = useState(null);
  const [flag, setFlag] = useState(true);
  const getWeatherDataBySearch = async(e) =>{
    // document.body.classList.remove("bbody");
    // document.body.classList.remove("bbody-n");
    if(e.target.value.length !== 0 ){
      setFlag(false);
    }
    else if(e.target.value.length === 0 ){
      setFlag(true);
      new WOW.WOW().init(); 
    }
    if(e.keyCode === 13)
    {
      document.body.classList.remove("bbody");
      document.body.classList.remove("bbody-n");
      let inputVal = e.target.value.toLowerCase();
      let {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=metric&appid=097c5f03d6ba00b7c2ef9846ec3c5197`);
      console.log(data);
      setWeatherData(data);
    }
  }
  useEffect(() => {
    // new WOW.WOW().init();
    // document.body.classList.add('bbody-n')
  }, [])
  
  return <>
  <div className="all-height d-flex justify-content-center align-items-center">
    <div className="input-search p-2 bg-nav w-75">
      <input type="text" onKeyDown={getWeatherDataBySearch} aria-label='search' placeholder='Seach By City Name' className='w-100 rounded-pill border outline-nn bg-transparent border-white-50 text-white p-2 px-3'/>
      <div className='content p-3'>
        {flag ? <>
        <h2 className='display-4 fst-italic text-white-75 text-center my-5 wow animate__shakeY' data-wow-duration="2s" data-wow-iteration="infinite">No Weather Data</h2>
        </> : <>
        {weatherData ? <>
            {weatherData.main.temp > 19 ? document.body.classList.add("bbody") : document.body.classList.add("bbody-n")}
            <p className='display-4'>{weatherData.name}</p>
            <i className="fa-solid fa-temperature-full text-warning px-1"></i>
            <span> {weatherData.main.temp}° C</span> <br/>
            <span>Humidity - {weatherData.main.humidity}%</span> <br />
            <span>Pressure - {weatherData.main.pressure}</span> <br/>
            <i className="fa-solid fa-cloud fa-2x ps-1 pe-2"></i>
            <span className='fs-1'>{weatherData.weather[0].description}</span>
        </> : <>
          <div className='w-100 mx-auto text-center my-3' >
            <i className='fa-solid fa-spinner fa-3x text-white text-center fa-spin'>
            </i>
          </div>
        </>}
        </>}
      </div>
    </div>
  </div>
  </>
}

export default SearchByName
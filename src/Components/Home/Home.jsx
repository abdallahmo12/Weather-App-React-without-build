import React, { useEffect, useState } from 'react';
import moment from 'moment';
import WOW from 'wowjs';

function Home({ currWeather }) {

    const [seeMore, setSeeMore] = useState(true);

    let dt = new Date();
    let monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let num = dt.getDate();
    let day = days[dt.getDay()];
    let month = monthes[dt.getMonth()];
    let year = dt.getFullYear();
    let dateFormat = `${day} , ${num} ${" "} ${month} ${" "} ${year}`;

    const changeMoreFlag = () =>{
        setSeeMore(!seeMore);
    }

    useEffect(() => {
    document.body.classList.add("bbody-n");
    // currWeather.main.temp > 19 ? document.body.classList.add("bbody") : document.body.classList.add("bbody-n")
    new WOW.WOW().init();
    
    }, [])
    
    return <>
    {currWeather ? <>
        <div className='container'>
            <div className='mb-5'>
                <div className="row bg-ddrk rounded-5 m-3 my-5 py-2 justify-content-center align-items-center">
                    <div className="col-md-3">
                        <img className='wow animate__rotateOutUpLeft rounded-circle' data-wow-duration="5s" data-wow-iteration="10" src={`https://openweathermap.org/img/wn/${currWeather.weather[0].icon}@4x.png`} alt="basic" />
                    </div>
                    <div className="col-md-9 text-bg-dark">
                        <div className='d-flex'>
                            <div className="item-1">
                                <span className='display-1'>{`${Math.round(currWeather.main.feels_like)}° C`}</span>
                                <h5>{dateFormat}</h5>
                                <h2 className='display-6 char-spacing'>{currWeather.name}</h2>
                            </div>
                            <div className="item-2 text-end flex-grow-1">
                                {/* <p className='w-100  display-6 '>{}</p> */}
                            </div> 
                        </div>
                    </div>
                </div>
                <button onClick={changeMoreFlag} className='btn btn-close-white btn-outline-dark w-75 d-block mx-auto fw-bold mb-3'>see more</button>
                {seeMore ? <>
                {document.body.classList.remove("bbody-vh")}
                <div className='pb-3'>
                    <div className='row g-4 mx-auto p-2 rounded-3'>
                        <div className='col-6 '><div className="mx-2 p-5 bg-dark rounded-4 border-white">Pressure - {currWeather.main.pressure}</div></div>
                        <div className='col-6 '><div className="mx-2 p-5 bg-orange rounded-4 border-white">Humidity - {currWeather.main.humidity}%</div></div> 
                        <div className='col-6 '><div className="mx-2 p-5 bg-orange rounded-4 border-white">sunrise - {moment(currWeather.sys.sunrise * 1000).format("hh:mm a")}</div></div>
                        <div className='col-6 '><div className="mx-2 p-5 bg-dark rounded-4 border-white">sunset - {moment(currWeather.sys.sunset * 1000).format("hh:mm a")}</div></div>
                        <div className='col-6 '><div className="mx-2 p-5 bg-dark rounded-4 border-white">Wind Speed - {currWeather.wind.speed} km/h</div></div>
                    
                    </div>
                </div>
                </> : document.body.classList.add("bbody-vh")}
            </div>
        </div>
    </> : <>
        <div className="all-height d-flex justify-content-center align-items-center">
            <i className='fa-solid fa-spinner fa-5x fa-spin text-white'></i>
        </div>
    </>}

    </>
}

export default Home
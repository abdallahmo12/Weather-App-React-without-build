import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route , Routes } from 'react-router-dom';
import SignIn from "./Components/Signin/SignIn";
import Home from "./Components/Home/Home";
import SignUp from "./Components/Signup/SignUp";
import NotFound from "./Components/NotFound/NotFound";
import axios from 'axios';
import SearchByName from "./Components/SearchByName/SearchByName";
import jwtDecode from "jwt-decode";
import {useNavigate , Navigate} from 'react-router-dom';

function App() {

  function ProtectedComponent(props){
    if(localStorage.getItem("tkn")){
      // console.log(props);
      return props.children;
    }else{
      return <Navigate to="/signin"/>
    }
  }

  const [current, setCurrent] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  // const navigate = useNavigate();
  
  function decodeToken(){
    let details = localStorage.getItem("tkn") && jwtDecode(localStorage.getItem("tkn"));
    setUserDetails(details);
  }
  useEffect(() => {
    // localStorage.getItem("tkn") && setUser(jwtDecode(localStorage.getItem("tkn")));
    navigator.geolocation.getCurrentPosition((success) => {
      async function getCurrentWeatherData(){
        let {latitude , longitude} = success.coords;
        let {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=097c5f03d6ba00b7c2ef9846ec3c5197`);
        console.log(data);
        setCurrent(data);
      }
      // console.log(success);
      getCurrentWeatherData();
      // console.log(res);
    })
    localStorage.getItem("tkn") && decodeToken();
  }, [])
  
  return (
    <div className="App">
      <Navbar user={userDetails} setUser={setUserDetails}/>

      <Routes>

        <Route path='' element={<Home currWeather={current}/>} />
        <Route path='home' element={<Home currWeather={current}/>} />
        <Route path='search' element={<ProtectedComponent><SearchByName /></ProtectedComponent>} />
        <Route path='signin' element={<SignIn decodeToken={decodeToken}/>} />
        <Route path='signup' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn({decodeToken}) {
  let navigate = useNavigate();

  const [errlist, setErrlist] = useState([]);
  const [errorApiRes, setErrorApiRes] = useState('');

  const [user, setUser] = useState({
    email : '',
    password  : ''
  })
  useEffect(() => {
    document.body.classList.remove("bbody-n");
    document.body.classList.remove("bbody");
  }, [])
  

  function getUser(e){
    setErrlist([]);
    setErrorApiRes('');
    //value of input
    let inputValue = e.target.value;
    // Deep Copy
    let newUser = {...user};
    // Change proprety of obj
    newUser[e.target.id] = inputValue;

    // set State
    setUser(newUser);

    // console.log(newUser);
  }

  const submitForm = async (e) =>{
    e.preventDefault();

    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net' , 'org' , 'eg'] } }).required(),
      password : Joi.string().pattern(/^[a-z0-9]{4,}$/i).required()
    })

    let response = schema.validate(user , { abortEarly:false });
    // console.log(response);
    if(response.error){
      console.log(response.error.details);
      setErrlist(response.error.details);
    }
    else{
      // Call Api
      let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signin' , user);
      console.log(data);
      if(data.status === 401 ){
        setErrorApiRes(data.message);
        console.log(data);
      }else{
        localStorage.setItem("tkn", data.token);
        decodeToken();
        navigate('/home');
      }

      // navigate('signin');
    }
  }
  function getErrorMessage(k){
    let errObj = errlist.find(err => err.context.key === k);
    return <>{ errObj ? <div className='alert alert-danger py-1 my-2'>{errObj.message}</div> : ""}</>
  }

  return <>
  <div className="container">
    <div className="from p-3 ">
      <h2 className='w-100 text-center'> Sign In </h2>
      <form onSubmit={submitForm}>
        {errorApiRes ? <div className="alert alert-danger py-1 my-2 text-center">{errorApiRes}</div> : ""}
        <label htmlFor="email">email</label>
        <input onChange={getUser} className='form-control my-1 bg-transparent text-white' type="text" placeholder='email' id='email' aria-label='email'/>
        {getErrorMessage("email")}
        <label htmlFor="password">password</label>
        <input onChange={getUser} className='form-control my-1 bg-transparent text-white' type="text" placeholder='password' id='password' aria-label='password'/>
        {getErrorMessage("password")}
        <button className='btn btn-close-white btn-outline-dark mt-3 w-100'>Login</button>
      </form>
    </div>
  </div>
  
  </>
}

export default SignIn
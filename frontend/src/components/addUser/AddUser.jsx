import React, { useState } from 'react';
import "./AddUser.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {

  const users ={
    name:"",
    email:"",
    password:"",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e)=>{
    const {name,value} = e.target;

    console.log(name,value);

    setUser({...user, [name]:value});
  };

  const submitForm = async (e)=>{
    e.preventDefault();
    try {

      await axios.post("http://localhost:3000/api/user", user)
      .then((res)=>{
        toast.success(res.data.message,{position: 'top-center'})
        navigate("/");
      })
      .catch((error)=>console.log(error));

    } catch (error) {
      console.log("Error: ", error.message);
    }
  }


  return (
    <div className='addUser'>

      <Link to = "/" className='btn btn-secondary'>
        <i class="fa-solid fa-backward"></i> Back
      </Link>

      <h2>Add New Uesr</h2>

      <form onSubmit={submitForm} className='addUserForm'>
        <div className='inputGroup'>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" autoComplete='off' placeholder='Enter your name' onChange={inputHandler}/>
        </div>
        <div className='inputGroup'>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" id="email" autoComplete='off' placeholder='Enter your email' onChange={inputHandler}/>
        </div>
        <div className='inputGroup'>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" autoComplete='off' placeholder='Enter your Password' onChange={inputHandler}/>
        </div>
        <div className='inputGroup'>
          <button className='btn btn-primary' type='submit'>Submit</button>
        </div>
      </form>
      
    </div>
  )
};

export default AddUser;

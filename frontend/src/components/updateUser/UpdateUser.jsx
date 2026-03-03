import React, { useEffect, useState } from 'react';
import "./UpdateUser.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {

  const users ={
    name:"",
    email:"",
    password:"",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const {id} = useParams();

  const inputHandler = (e)=>{
    const {name,value} = e.target;

    console.log(name,value);

    setUser({...user, [name]:value});
  };

  useEffect(()=>{
    axios.get(`https://mern-try-09sy.onrender.com/api/users/${id}`)
    .then((res)=>{
        setUser(res.data);
    })
    .catch((error)=>console.log("Error:", error.message));
  }, [id]);

  const submitForm = async (e)=>{
    e.preventDefault();
    try {

      await axios.patch(`https://mern-try-09sy.onrender.com/api/users/${id}`, user)
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

      <h2>Update Uesr</h2>

      <form onSubmit={submitForm} className='addUserForm'>

        <div className='inputGroup'>
          <label htmlFor="name">Name: </label>
          <input type="text" value={user.name} name="name" id="name" autoComplete='off' placeholder='Enter your name' onChange={inputHandler}/>
        </div>

        <div className='inputGroup'>
          <label htmlFor="email">Email: </label>
          <input type="email" value={user.email} name="email" id="email" autoComplete='off' placeholder='Enter your email' onChange={inputHandler}/>
        </div>

        <div className='inputGroup'>
          <label htmlFor="password">Password: </label>
          <input type="password" value={user.password} name="password" id="password" autoComplete='off' placeholder='Enter your Password' onChange={inputHandler}/>
        </div>

        <div className='inputGroup'>
          <button className='btn btn-primary' type='submit'>Submit</button>
        </div>
        
      </form>
      
    </div>
  )
};

export default UpdateUser;

import React from 'react';
import "./User.css";
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const User = () => {
  
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const fetchData = async ()=> {
      try {
        const res = await axios.get("http://localhost:3000/api/users");
        setUsers(res.data);
      } catch (error) {
        console.log("Error while fetching.");
      }
    }
  useEffect(()=> {
    fetchData();
  }, []);

  const deleteUser = async (userid)=>{
    await axios.delete(`https://mern-try-09sy.onrender.com/api/users/${userid}`)
    .then((res)=>{
      setUsers((prevUsers)=> prevUsers.filter((user)=>user._id !== userid));
      toast.success(res.data.message,{position:'top-center'});
      fetchData();
      // navigate("/");
    })
    .catch((error)=>console.log("Error: ", error.message));
  }

  return (
    <div className='userTable'>
      <Link to = "/add" type="button" class="btn btn-primary">
        Add User <i class="fa-solid fa-user-plus"></i>
      </Link>

      {users.length === 0 ? (
        <div className="nodata">
          <p>No Data to Display.</p>
        </div>
      ):(
        <table className='table table-bordered'>
        <thead>
            <tr>
                <th scope='col'>S.No</th>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Action</th>
            </tr>
        </thead>
        <tbody>
          {users.map((user,index)=>{
            return(
              <tr>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className='actionButtons'>
                  <Link to={`/update/`+user._id} type="button" class="btn btn-info">
                    <i class="fa-regular fa-pen-to-square"></i>
                    
                  </Link>
                       
                  <button type="button" class="btn btn-danger" onClick={()=> deleteUser(user._id)}>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
            </tr>
            );
          })}
        </tbody>
      </table>
      )}
      
    </div>
  )
}

export default User

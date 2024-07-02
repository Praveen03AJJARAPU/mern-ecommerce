import { useState } from "react";
import { inpStyling } from "../constants";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'

function Register() {
  const nav = useNavigate()
  const [inpData, setData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const { username, email, password } = inpData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...inpData, [name] : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:5000/signUp', {...inpData}, {withCredentials: true});
      const {success, message} = data;
      if(success) {
        nav("/login");
        toast.success(message, { position: "bottom-center" });
      } else toast.error(message, {position: 'bottom-center'})
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 my-5 w-max">
        <input
          type="text"
          onChange={handleChange}
          value={username}
          name="username"
          placeholder="name"
          className={`${inpStyling}`}
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          placeholder="email"
          className={`${inpStyling}`}
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          placeholder="password"
          className={`${inpStyling}`}
        />
        <button type="submit" className="bg-black cursor-pointer text-white px-10 py-2 rounded-full">
          Register
        </button>
      </form>
      <ToastContainer />
      <p>
        Already a user? <span onClick={() => nav('/login')} className="underline cursor-pointer">Login</span>
      </p>
    </div>
  );
}

export default Register
import { useState } from "react";
import { inpStyling } from "../constants";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import { FiPlus } from "react-icons/fi";
import noDp from '../assets/no_dp.jpg'

function Register() {
  const nav = useNavigate()
  const [img, setImg] = useState();
  const [inpData, setData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const { username, email, password } = inpData;
  const handleImg = async(image) => {
   
    if(image.type == 'image/jpeg' || image.type == 'image/png' || image.type == 'image/jpg') {
      setImg(image);
    } else console.log("image please")
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...inpData, [name] : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("hi")
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', img);
      const {data} = await axios.post('http://localhost:5000/signUp', formData);
      const {success, message} = data;
      console.log(data)
      if(success) {
        nav("/login");
        toast.success(message, { position: "bottom-center" });
      } else toast.error(message, {position: 'bottom-center'})
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col bg-black  h-[100vh] items-center">
      <h1 className="text-white">Register</h1>
      <input
        type="file"
        onChange={(e) => handleImg(e.target.files[0])}
        className="hidden"
        accept="image/*"
        id="img"
        required
      />
      <label htmlFor="img">
        <FiPlus
          className="absolute top-20 right-[46%] text-black p-3 rounded-full z-30 bg-white"
          size={45}
        />
      </label>
      <img
        src={img ? URL.createObjectURL(img) : noDp}
        className="w-[100px] h-[100px] rounded-full object-cover"
        alt="dp"
      />
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
        <button
          type="submit"
          className="bg-white cursor-pointer text-black px-10 py-2 rounded-full"
        >
          Register
        </button>
      </form>
      <ToastContainer />
      <p>
        Already a user?{" "}
        <span
          onClick={() => nav("/login")}
          className="underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Register
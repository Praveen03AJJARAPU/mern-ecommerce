import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import { useEffect, useState } from 'react';
import axios from 'axios'
import Nav from '../components/Nav';

function Home() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [usename, setUsername] = useState("");
  useEffect(() => {
    const verify = async() => {
      if(!cookies.token) {
        navigate('/login');
      }
      const { data } = await axios.post(
        "http://localhost:5000",
        {},
        { withCredentials: true }
      );
      const {status, user} = data;
      setUsername(user);
      return status ? '' : (removeCookie('token'), navigate('/login'))
    }
    verify();
  },[cookies, navigate, removeCookie]);
  
  return (
    <div  className='font-orbit'>
      <Nav />
    </div>
  )
}

export default Home
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Explore from './pages/Explore'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Profile from './pages/Profile'

function App() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();
  useEffect(() => {
    axios.get("http://localhost:5000/post/get").then((res) => {
      setPosts([...res.data]);
      console.log(res.data);
    });
  }, []);
  return (
    <div>
      <Routes>
        <Route element={<Register  />} path='/register' />
        <Route element={<Login />} path='/login' />
        <Route element={<Home posts={posts} setPosts={setPosts} userId={userId} setUserId={setUserId} />} path='/' />
        <Route element={<Explore posts={posts} />} path='/explore' />
        <Route element={<Profile posts={posts} />} path='/profile/:id' />
      </Routes>
    </div>
  )
}

export default App

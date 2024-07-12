import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import { useEffect, useState } from 'react';
import axios from 'axios'
import Nav from '../components/Nav';
import PostModal from '../components/PostModal';
import Posts from '../components/Posts';
import Suggestions from '../components/Suggestions';
import { FaPen } from "react-icons/fa6";
import { postButton } from '../constants';

function Home({posts, setPosts, setUserId, userId}) {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [postModal, setPostModal] = useState(false);
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
      console.log(data)
      const {status, user} = data;
      setUserId(user);
      return status ? '' : (removeCookie('token'), navigate('/login'))
    }
    verify();
  },[cookies, navigate, removeCookie]);
  
  return (
    <div className="font-inter bg-black text-white relative flex ">
      <Nav removeCookie={removeCookie} userId={userId} />
      <div>
        <Posts userId={userId} posts={posts} setPosts={setPosts} />
      </div>
      <div className="w-[300px]"></div>
      <PostModal
        userId={userId}
        postModal={postModal}
        setPostModal={setPostModal}
      />
      
      <span onClick={() => setPostModal((p) => !p)} className={`${postButton}`}>
        <FaPen size={20} />
      </span>
      <Suggestions />
    </div>
  );
}

export default Home
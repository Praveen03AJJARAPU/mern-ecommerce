import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoBookmarkOutline } from "react-icons/io5";
import {flex } from '../constants'
import '../App.css'
import CommentSection from "./CommentSection";
function Post({content, _id, likes, userID, createdAt, images, username}) {
  const [likePost, setLikePost] = useState();
  const [commentSection, setCommentSection] = useState(false);
  
  const [comments, setComments] = useState([]);
  const [time, setTime] = useState({time: 0, type: ''})
  
  const handleLike = async() => {
    const {data} = await axios.post('http://localhost:5000/post/like', {_id, user: userID})
    setLikePost(data.status);
  }
  
  const getComments = async() => {
    await axios.get(`http://localhost:5000/post/comment/${_id}`)
    .then((res) => setComments(res.data)) 
  }
  
  useEffect(() => {
    if(likes.includes(userID)) setLikePost(true);
    const createdTime = new Date(createdAt);
    const now = new Date();
    const timeDiff = now - createdTime;
    const seconds = Math.floor(timeDiff / 1000);
    var minutes = 0, hours = 0, days = 0; 
    if(seconds < 60) {
      setTime({time: seconds, type: 'seconds'})
    } else if(minutes < 60 && seconds >= 60 ) {
      minutes = Math.floor(seconds / 60);
      setTime({time: minutes, type: 'minutes'})
    } else if(minutes > 60 || hours < 24) {
      hours = Math.floor(minutes / 60)
      setTime({time: hours, type: 'hours'})
    } else {
      days = Math.floor(hours / 24);
      setTime({time: days, type: 'days'})
    }
  },[])
  
  
  return (
    <div className="mb-16">
      <div>
        <div className={`${flex} gap-2 mb-2`}>
          <img
            src={`http://localhost:5000/Images/${username.image}`}
            className="w-[35px] h-[35px] rounded-full"
            alt="profile_pic"
          />
          <div>
            <p className="font-semibold">{username.username}</p>
            <p className="text-sm">{time.time + time.type} ago</p>
          </div>
        </div>
        <p className="text-xl font-semibold mb-2">{content}</p>
        <img
          src={`http://localhost:5000/Images/${images[0]}`}
          className="rounded-lg"
          alt="post_img"
        />
        <div className="flex items-center justify-around my-2">
          <div
            className="flex flex-col justify-center mt-7 gap-2"
            onClick={handleLike}
          >
            {!likePost ? (
              <GoHeart size={30} />
            ) : (
              <GoHeartFill className="text-red-400" size={30} />
            )}
            <p className="">{`${
              likes.length == 1
                ? `${likes.length} like`
                : `${likes.length} likes`
            }`}</p>
          </div>
          <span
            onClick={() => {
              setCommentSection((prev) => !prev), getComments();
            }}
          >
            <FaRegComment size={30} />
          </span>
          <span>
            <IoBookmarkOutline size={30} />
          </span>
        </div>
      </div>
      {commentSection ? (
        <CommentSection images={images} likePost={likePost} username={username} handleLike={handleLike} comments={comments}  setCommentSection={setCommentSection} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Post
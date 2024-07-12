import React from 'react'
import { flex } from '../constants';
import { GoHeart } from "react-icons/go";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
function PostCard({post, explore}) {
  return (
    <div className="relative">
      <div className="w-[300px] h-[300px]">
        <img
          src={`http://localhost:5000/Images/${post.images[0]}`}
          alt="post_Image"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div
        style={{ background: "rgba(0,0,0,0.5)" }}
        className={`${flex}  gap-16 absolute pb-3 pt-1 w-full  bottom-0 px-3`}
      >
        <div className={`${flex} ${!explore ? "hidden" : "block"}`}>
          <img
            className="w-[25px] h-[25px] object-cover rounded-full"
            src={`http://localhost:5000/Images/${post.username.image}`}
            alt="profile_pic"
          />
          <p>{post.username.username}</p>
        </div>
        <div className={`${flex} w-full justify-between gap-2`}>
          
            <GoHeart size={20} />
            <IoBookmarkOutline size={20} />

          <div>
            {!explore && <MdDelete size={25} className="text-red-500" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard
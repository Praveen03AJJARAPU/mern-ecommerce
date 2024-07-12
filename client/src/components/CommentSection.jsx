import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { flex } from "../constants";
import Comment from "./Comment";


function CommentSection({images, handleLike, likePost, comments, username, setCommentSection}) {
  const [comment, setComment] = useState('')
  
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:5000/post/comment", {
        _id,
        userID,
        text: comment,
      });
      console.log(data);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-[100vw] h-[100vh] z-30 fixed flex justify-center  items-center right-0 top-0"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <span
        onClick={() => {
          setCommentSection(false);
        }}
        className="absolute top-10 right-10 text-white"
      >
        <RxCross2 size={30} />
      </span>

      <div className="w-[500px] h-[600px] ">
        <img
          src={`http://localhost:5000/Images/${images[0]}`}
          alt="post_img"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-black w-[500px] h-[600px]">
        <div className={`${flex} gap-2 mb-2 border-b-2 p-2`}>
          <img
            src={`http://localhost:5000/Images/${username.image}`}
            className="w-[35px] h-[35px] rounded-full"
            alt="profile_pic"
          />
          <div>
            <p className="font-semibold">{username.username}</p>
            {/* <p className="text-sm">{time.time + time.type} ago</p> */}
          </div>
        </div>
        <div className="px-5 m-2 overflow-y-scroll h-[450px]">
          <h1 className="text-3xl">Comments</h1>

          {comments.length > 0 ? (
            comments.map((comment) => <Comment {...comment} />)
          ) : (
            <div className="flex items-center w-full h-full text-white">
              <p>Be first to comment</p>
            </div>
          )}
        </div>
        <div className="fixed bottom-12">
          <div className="flex border-t-[1px] pt-2 items-center w-[500px] justify-around my-2">
            <div onClick={handleLike}>
              {!likePost ? (
                <GoHeart size={30} />
              ) : (
                <GoHeartFill className="text-red-400" size={30} />
              )}
            </div>
            <span>
              <FaRegComment size={30} />
            </span>
          </div>
          {/* <p className="px-3">hi</p> */}
          <form onSubmit={handleComment}>
            <input
              type="text"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className="w-full py-2 px-2 border-t-[1px] border-slate-300 outline-none text-white bg-black"
              placeholder="Add comment"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentSection
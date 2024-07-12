import Nav from "../components/Nav"
import PostCard from "../components/PostCard";
import { IoSearchSharp } from "react-icons/io5";
import { grid } from "../constants";

function Explore({posts}) {
  return (
    <div className="bg-black font-inter flex text-white h-full">
      <Nav />
      <div className="m-5">
        <h1 className="text-3xl my-5 font-bold">Explore</h1>
        <div className="relative">
          <input
            type="text"
            className="my-5 pl-5 bg-black outline-none border-b-2 w-full pb-1"
            placeholder="Search"
          />
          <span className="absolute left-0 top-6">
            <IoSearchSharp />
          </span>
        </div>
        <div className={`${grid}`}>
          {posts.map((post) => (
            <PostCard post={post} explore={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore
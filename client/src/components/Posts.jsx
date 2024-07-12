import { useEffect } from "react"
import axios from 'axios'
import Post from "./Post";

function Posts({username, posts, setPosts}) {
  return (
    <div className="xl:w-[650px] lg:w-[500px] w-[400px] mb- mx-16">
       <h1 className="text-3xl font-bold my-10">Home Feed</h1>
        {posts.map((post, id) => (
            <Post userID={username} {...post} key={id} />
        ))}
    </div>
  )
}

export default Posts
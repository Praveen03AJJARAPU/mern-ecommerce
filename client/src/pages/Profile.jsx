import { useParams } from "react-router-dom"
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tab, TabIndicator, TabList, Tabs } from '@chakra-ui/react'
import PostCard from "../components/PostCard";
import { grid } from "../constants";

function Profile({posts}) {
    const {id} = useParams();
    const [user, setUser] = useState({});
    const [index, setIndex] = useState(0);
    const [filter, setFilter] = useState([]);
    useEffect(() => {
       const getProfile =  async() => {
            const {data} = axios.get(`http://localhost:5000/post/profile/${id}`)
            .then((res) => setUser(res.data))
        }
        getProfile();
        
    },[])
    useEffect(() => {
        setFilter(posts?.filter((post) => id == post.username._id));

    },[posts])
  return (
    <div className="bg-black text-white flex">
      <Nav />
      <div>
        <div className="pt-10 flex gap-4">
          <img
            src={`http://localhost:5000/Images/${user.image}`}
            alt="profile_pic"
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-2xl">{user.username}</p>
            <p className="text-slate-400 mt-1">@{user.username}</p>
            <p className="mt-1">bio</p>
            <p className="text-md mt-3">
              {" "}
              <span className="text-slate-300">{user.posts?.length} </span>{" "}
              posts
            </p>
          </div>
        </div>
        <Tabs position="relative" variant="unstyled">
          <TabList className="flex gap-10 mt-10 text-xl">
            <Tab onClick={() => setIndex(0)}>Posts</Tab>
            <Tab onClick={() => setIndex(1)}>Liked</Tab>
            <Tab onClick={() => setIndex(2)}>Saved</Tab>
          </TabList>
          <TabIndicator
            mt="-0.5px"
            height="2px"
            bg="white"
            borderRadius="1px"
          />
        </Tabs>
        <div className={`${grid} mt-10`}>
            {filter?.map((p) => (
                <PostCard post={p} explore={false} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Profile
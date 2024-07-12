import { IoSettingsOutline } from "react-icons/io5";
import { useCookies } from "react-cookie"
import { HiHome } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { flex } from "../constants";
import { Link, useNavigate } from "react-router-dom";

function Nav({removeCookie, userId}) {
  const navigate = useNavigate();
    const logout = () => {
        removeCookie("token");
        navigate('/login');
      }
  return (
    <div className=" sticky top-10 bg-black text-white flex flex-col h-[100vh] p-10 gap-16 w-[300px]">
      <div className="flex flex-col justify-between h-[80vh]">
        <div className="flex flex-col gap-10 text-xl">
          <span
            className={`${flex} cursor-pointer gap-4`}
            onClick={() => navigate("/")}
          >
            <HiHome size={30} />
            <p>Home</p>
          </span>
          <Link to={`/profile/${userId}`}>
            <span className={`${flex} cursor-pointer gap-4`}>
              <FaUser size={28} />
              <p>Profile</p>
            </span>
          </Link>
          <span
            className={`${flex} cursor-pointer gap-4`}
            onClick={() => navigate("/explore")}
          >
            <MdExplore size={30} />
            <p>Explore</p>
          </span>
          <span className={`${flex} cursor-pointer gap-4`}>
            <IoSettingsOutline size={30} />
            <p>Settings</p>
          </span>
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Nav
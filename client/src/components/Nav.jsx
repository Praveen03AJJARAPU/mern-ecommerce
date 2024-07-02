import { IoSettingsOutline } from "react-icons/io5";
import { useCookies } from "react-cookie"
import { HiHome } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";
import { flex } from "../constants";

function Nav() {
    const [cookies , setCookies] = useCookies();
    const logout = () => {
        removeCookie("token");
        navigate('/login');
      }
  return (
    <div className="h-[100vh] fixed top-0 bg-black justify-center text-white flex flex-col items-center gap-16 w-[20%]">
      <div className="flex flex-col gap-10 text-xl">
        <span className={`${flex} gap-4`}>
          <HiHome size={30} />
          <p>Home</p>
        </span>
        <span className={`${flex} gap-4`}>
          <FaUser size={28} />
          <p>Profile</p>
        </span>
        <span className={`${flex} gap-4`}>
          <BiSolidMessageDetail size={30} />
          <p>Messages</p>
        </span>
        <span className={`${flex} gap-4`}>
          <IoSettingsOutline size={30} />
          <p>Settings</p>
        </span>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Nav
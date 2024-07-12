import { flex } from "../constants";


function Comment({text, username, id}) {
 console.log(text, username)
  return (
    <div className="mt-2">
      <div className={`${flex} gap-2`}>
        <img
            src={`http://localhost:5000/Images/${username.image}`}
            className="w-[25px] h-[25px] rounded-full"
            alt="profile_pic"
          />
        <p className="text-lg font-medium">{username.username}</p>
      </div>
      <p className="ml-8 mt-1">{text}</p>
    </div>
  );
}

export default Comment
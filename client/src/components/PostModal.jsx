import axios from "axios";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";

const PostModal = ({postModal, setPostModal, userId}) => {
    const [images, setImages] = useState([]);
    const [content, setContent] = useState('');
    const handleImage = async(img) => {
        console.log(img)
        if(img.type == 'image/jpeg' || img.type == 'image/png' || img.type == 'image/jpg') {
          setImages((prev) => [...prev, img]);
        } else console.log("image please")
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('content', content);
            formData.append('username', userId);
            images.forEach((img) => formData.append('images', img))
            formData.get('images')
            const { data } = await axios.post(
              "http://localhost:5000/post/create", formData);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div
      className={`w-screen ${
        postModal ? "flex" : "hidden"
      } items-center justify-center h-[100vh] fixed right-0 top-0`}
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-black">
        <form onSubmit={handleSubmit}>
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write the post" />
          <div className="w-[500px] h-[500px]">
            {images.length > 0 ? (
              <div></div>
            ) : (
              <label
                className="bg-black text-white justify-center flex flex-col items-center h-full"
                htmlFor="file"
              >
                <CiImageOn size={30} />
                <p className="text-sm">Add images to post</p>
              </label>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="file"
              onChange={(e) => handleImage(e.target.files[0])}
              id="file"
              accept="image/*"
              className="hidden"
            />
            <label htmlFor="file" className="bg-white p-2 rounded-full text-black">
            <FiPlus size={25} />
            </label>
            {images.length > 0 ? (
              <div className="flex items-center gap-2">
                {images.map((img) => (
                  <div className="w-[70px] h-[70px]">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="min_posted_image"
                      className="w-full h-full"
                    />
                  </div>
                ))}
                <button type="submit" className="text-white">submit</button>
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostModal
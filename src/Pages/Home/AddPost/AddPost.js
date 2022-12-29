import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RiAccountCircleFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";

const AddPost = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
  } = useForm();
  
    const imgHostKey = process.env.REACT_APP_imgbb;
  const handlePost = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
       fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${imgHostKey}`,{
        method:"POST",
        body:formData
       })
       .then(res=>res.json())
        .then(imgData=>{
            const posts = {
                message: data.message,
                photo: imgData.data.url,
                displayName: user.displayName,
                photoURL: user.photoURL,
              };
              if(data.message.length < 20){
                alert ("please write more than 20 characters")
            }
            console.log();
            fetch("https://end-game-job-task-server.vercel.app/posts", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(posts),
            })
              .then((res) => res.json())
              .then((data) =>{
                navigate('/Media')
                toast.success('Post successful')
              })
              .catch((error) => console.log(error));
        })
    
    
  };
  return (
    <div>
      <img
        className="lg:h-72 h-32 w-screen   border-8 border-base-300 "
        src="https://www.lrswebsolutions.com/Resources/60b0007e-fb56-43e3-bfbc-446b29738ddd/social-media.jpg"
        alt=""
      />
      {user && (
        <div className="flex absolute top-[200px] lg:top-[400px] ml-16 left-32 lg:left-58">
          <div className="avatar">
            <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user?.photoURL}
                className="h-32 w-32 rounded-full"
                alt=""
              />
            </div>
          </div>
        </div>
      ) }
      {
        !user?.photoURL &&  
        <RiAccountCircleFill className="h-32 w-32  lg:w-40 lg:h-40  rounded-full lg:border-8 border-base-300 absolute top-[200px] lg:top-[390px] left-32 lg:left-64" />
    
      }
      {user && (
        <h1 className="text-3xl lg:text-4xl font-semibold flex justify-start ml-10 lg:ml-72 mt-36 lg:mt-10">
          {user.displayName}
        </h1>
      )}
      <div className="divider mt-32"></div>
      <div className="mt-10">
      <label
        htmlFor="my-modal-3"
        className="input input-bordered p-4 lg:px-40  text-2xl text-gray-500"
      >
        What's on your mind ?
      </label>
      </div>
      <div>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <h3>Create post</h3>
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <div className="divider mt-3 mb-5 text-black"></div>
            {user ? (
              <div>
                <div className="flex">
                  <div className="w-14 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                    {user ? (
                      <img
                        src={user?.photoURL}
                        className="rounded-full"
                        alt=""
                      />
                    ) : (
                      <RiAccountCircleFill className="w-14" />
                    )}
                  </div>
                  <h2 className="ml-5 font-medium">{user.displayName}</h2>
                </div>
                <form onSubmit={handleSubmit(handlePost)}>
                  <h3 className="mt-5 text-xl">
                    <textarea
                      {...register("message", { required: true })}
                      className="textarea w-full text-xl h-72"
                      placeholder="What's on your mind?"
                    ></textarea>
                  </h3>

                  <input
                    {...register("image" )}
                    type="file"
                    className=" flex justify-start"
                  />

                  <div>
                    <input
                      type="submit"
                      value="Post"
                      className="btn btn-sm mt-7 w-full"
                    />
                  </div>
                </form>
              </div>
            ) : (
              <p>
                Please
                <Link to="SignUp" className="text-primary font-medium">
                  Sign Up
                </Link>
                to add post.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;

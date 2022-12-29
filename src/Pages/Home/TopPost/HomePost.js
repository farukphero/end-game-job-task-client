import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { RiAccountCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import Loading from "../../../Loading/Loading";

const HomePost = ({ post,refetch }) => {
  const {_id, photo, counter, photoURL, displayName, message } = post;
  const [count, setCount] = useState(counter + 1 || 1)
  const {user} = useContext(AuthContext)

  const handleUpdatedLove = () => {
    setCount(count + 1)
    const counting ={
      count
    }
    fetch(`https://end-game-job-task-server.vercel.app/posts/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(counting),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch()
      });
  };
  const handleComment = (event) => {
    event.preventDefault();
    const form = event.target;
    const comment = form.comment.value;
    // console.log(comment);
    const newId = _id;
    const comments = {
      comment,
      newId,
      name: user.displayName,
      photo:user.PhotoURL
    }
      
    
    fetch(`https://end-game-job-task-server.vercel.app/comments`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(comments),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.acknowledged){
          toast.success('Thanks for your comment')
          refetch()
          event.target.reset()
        }
        console.log(data);
       
      });
  };
  const { isLoading, error, data:commentsData =[]} = useQuery({
    queryKey: ["commentsData", _id],
    queryFn: async () => {
      const res = await fetch(`https://end-game-job-task-server.vercel.app/comments/${_id}`);
      const data = await res.json();
      return data ;
    },
     
  });
  if (isLoading) return  <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="my-24">
      <h1 className="mb-3 text-xl font-medium">Top Posts</h1>
      <div className="lg:w-1/2 mx-auto mb-20 bg-base-100 shadow-xl">
        <figure>
          <img className=""src={photo} alt="" />
        </figure>
        <p className="my-5">{message?.slice(0, 30)}</p>
        <hr />
        <div className="card-body">
          <div className="flex justify-between">
            <div>
              <FcLike  onClick={handleUpdatedLove}  className="h-8 w-8" />
              <div className="flex">
              <p className="mr-2">{counter}</p>  
              {
                counter < 2 ? <p>love</p> : <p>loves</p>
              }
              </div>
            </div>
            <div className="card-actions justify-end">
              {photoURL && (
                <div>
                  <img className="h-8 w-8 rounded-full" src={photoURL} alt="" />
                </div>
              )}
              {!photoURL && <RiAccountCircleFill className="h-8 w-8 absolute top-50" />}
              <div className="badge badge-outline">{displayName}</div>
            </div>
          </div>
          <div className="flex justify-end">
            <Link to={`/PostDetails/${_id}`}>
         
              <button className="btn btn-sm">Details</button>
            </Link>
          </div>
         <div>
         <form onSubmit={handleComment}>
            <input
              name="comment"
              type="text"
              placeholder="Write a comment......"
              className="input input-bordered w-full mb-3"
            />
             
          </form>
         <p> 
          {
            commentsData.map(info=>  
              <div className="flex">
              { info?.photo &&
                 <img className="h-12 w-12 rounded-full" src={info?.photo} alt="" />
                
              }
              { !info.photo &&
                 <RiAccountCircleFill className="h-12 w-12" />
                
              }
              <p className="ml-6 w-10/12 mx-auto"><hr className="mb-2"/> {info?.comment} <hr className="mt-2" /> </p>
              </div> )
          }
         </p>
         </div>
         
        </div>
      </div>
      
    </div>
  );
};

export default HomePost;

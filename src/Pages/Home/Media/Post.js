import React, { useContext, useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import Loading from "../../../Loading/Loading";

const Post = ({ post, refetch }) => {
  const { _id, message, displayName, photoURL, photo, counter, comment } = post;
 const {user} = useContext(AuthContext)
  const [count, setCount] = useState(counter + 1 || 1);

  const handleUpdatedLove = () => {
    setCount(count + 1);
    const counting = {
      count,
    };
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
        refetch();
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
        console.log(data);
        toast.success('Thanks for your comment')
        refetch()
        event.target.reset()
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
    <div >
      <div className="card w-10/12 mx-auto mb-20  ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-base-100 shadow-lg">
          <figure>
          <img className="" src={photo} alt="" />
        </figure>
        <p className="my-5">{message?.slice(0, 30)}</p>
        <hr />
        <div className="card-body">
          <div className="flex justify-between">
            <div>
           
              <FcLike onClick={handleUpdatedLove} className="h-8 w-8" />
              <div className="flex">
                <p className="mr-2">{counter}</p>
                {counter < 2 ? <p>love</p> : <p>loves</p>}
              </div>
            </div>
            <div className="card-actions justify-end">
              {photoURL && (
                <div>
                  <img className="h-8 w-8 rounded-full" src={photoURL} alt="" />
                </div>
              )}
              {!photoURL && <RiAccountCircleFill className="h-8 w-8" />}
              <div className="badge badge-outline">{displayName}</div>
            </div>
          </div>
          <div className="flex justify-end">
            <Link to={`/PostDetails/${_id}`}>
         
              <button className="btn btn-sm">Details</button>
            </Link>
          </div>
        </div>
          </div>
        
          <div>
          <form onSubmit={handleComment}>
            <input
              name="comment"
              type="text"
              placeholder="Write a comment......"
              className="input input-bordered w-full mb-4"
            />
             
          </form>
          
          <p> 
          {
            commentsData.map(info=> <div>
             
              <div className="flex">
              { info?.photo &&
                 <img className="h-12 w-12 rounded-full" src={info?.photo} alt="" />
                
              }
              { !info.photo &&
                 <RiAccountCircleFill className="h-12 w-12" />
                
              }
              <p className="ml-6 w-10/12 mx-auto"><hr className="mb-2"/> {info?.comment} <hr className="mt-2" /> </p>
              </div>
            </div> )
          }
         </p>
          <hr />
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Post;

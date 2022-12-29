import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FcLike } from "react-icons/fc";
import { RiAccountCircleFill } from "react-icons/ri";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../Loading/Loading";

const PostDetails = () => {
  const details = useLoaderData();
  const { _id, photo, counter, photoURL, displayName, message } = details;
  const {
    isLoading,
    error,
    data: commentsData = [],
  } = useQuery({
    queryKey: ["commentsData", _id],
    queryFn: async () => {
      const res = await fetch(`https://end-game-job-task-server.vercel.app/allComments/${_id}`);
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="my-12">
      <div className="lg:w-1/2 mx-auto mb-20">
        <figure>
          <img className="" src={photo} alt="" />
        </figure>
        <p className="my-5">{message}</p>
        <hr />
       
        <div className="card-body">
          <div className="flex justify-between">
            <div>
              <div>
                <p className="font-semibold">
                  {counter < 2 ? <p>love</p> : <p>loves</p>}
                </p>
                <p className="text-xl"> {counter}</p>
              </div>
              <p className="mt-10">
                {commentsData.map((info) => (
                  <div>
                    <div className="flex">
                      {info?.photo && (
                        <img
                          className="h-12 w-12 rounded-full"
                          src={info?.photo}
                          alt=""
                        />
                      )}
                      {!info.photo && (
                        <RiAccountCircleFill className="h-12 w-12" />
                      )}
                      <p className="lg:ml-10 mt-2 bg-base-100 shadow-md w-10/12 mx-auto">
                         {info?.comment} 
                        
                      </p>
                      
                    </div>
                  
                  </div>
                  
                ))}
              </p>
              <hr />
            </div>
            <div className=" ">
              {photoURL && (
                <div>
                  <img className="h-8 w-8 rounded-full" src={photoURL} alt="" />
                </div>
              )}
              {!photoURL && <RiAccountCircleFill className="h-8 w-8" />}
              <div className="badge badge-outline">{displayName}</div>
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

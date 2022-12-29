import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../Loading/Loading";
import Post from "./Post";

const Media = () => {
  const {refetch, isLoading, error, data:postData =[] } = useQuery({
    queryKey: ["postData"],
    queryFn: () =>
      fetch("https://end-game-job-task-server.vercel.app/posts").then((res) => res.json()),
  });
  if (isLoading) return  <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  return <div>
   {
    postData.map(post=><Post
    key={post._id}
    post ={post}
    refetch={refetch}
    ></Post>)
   }
  </div>;
};

export default Media;

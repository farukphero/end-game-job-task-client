import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import { RiAccountCircleFill } from "react-icons/ri";
import EditProfile from "../EditProfile/EditProfile";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Loading/Loading";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const {
    isLoading,
    error,
    data: profileInfo = {},
  } = useQuery({
    queryKey: ["profileInfo", user?.email],
    queryFn: () =>
      fetch(`https://end-game-job-task-server.vercel.app/profileInfo?email=${user?.email}`).then(
        (res) => res.json()
      ),
  });
  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-10/12 lg:w-8/12 mx-auto my-20">
      <div className="lg:flex">
        <div className="flex justify-center">
          <figure className="lg:px-10">
            {user?.photoURL && (
              <img
                src={user?.photoURL}
                alt=""
                className="rounded-full h-40 w-40"
              />
            )}
            {!user?.photoURL && <RiAccountCircleFill className="w-40 h-44 " />}
            {/* The button to open modal */}
            <label htmlFor="editProfileModal" className="btn btn-sm mt-5">
              Edit Profile
            </label>

            {/* Put this part before </body> tag */}
            <input
              type="checkbox"
              id="editProfileModal"
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="editProfileModal"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <EditProfile></EditProfile>
              </div>
            </div>
          </figure>
        </div>
        <div className="lg:ml-12 mt-10">
          <div>
            <h2 className="flex justify-start text-black">Full Name</h2>
            <h2 className="flex justify-start mb-3 mt-1 text-xl font-medium">
              {user?.displayName}
            </h2>
            <h2 className="flex justify-start">Email Address</h2>
            <h2 className="flex justify-start mb-3 mt-1 text-xl font-medium">
              {user?.email}
            </h2>
          </div>
          <div>
            
              <div>
                {
                  profileInfo &&  <h2 className="flex justify-start">Phone Number</h2>
                }
                <h1 className="flex justify-start mb-3 mt-1 text-xl font-medium">
                
                  {profileInfo?.phone}
                </h1>
                <h2 className="flex justify-start">University/College</h2>
                <h1 className="flex justify-start mb-3 mt-1 text-xl font-medium">
                  {profileInfo?.education}
                </h1>
                <p>Present Address</p>
                <hr />
                <h2 className="flex justify-start">District</h2>
                <h1 className="flex justify-start mb-3 mt-1 text-xl font-medium">
               
                  {profileInfo?.presentDistrict}
                </h1>
                <h2 className="flex justify-start">Division</h2>
                <h1 className="flex justify-start mb-3 mt-1 text-xl font-medium">
        
                  {profileInfo?.presentDivision}
                </h1>
                <p>Permanent Address</p>
                <hr />
                <h2 className="flex justify-start">District</h2>
                <h1 className="flex justify-start mb-3 mt-1 text-xl font-medium">
         
                  {profileInfo?.permanentDistrict}
                </h1>
                <h2 className="flex justify-start">Division</h2>
                <h1 className="flex justify-start mb-3 mt-1 text-xl font-medium">
                  {profileInfo?.permanentDivision}
                </h1>
                <h2 className="flex justify-start">Nationality</h2>
                <h1 className="flex justify-start mb-3 mt-1 text-xl font-medium">
                  {profileInfo?.nationality}
                </h1>
              </div>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

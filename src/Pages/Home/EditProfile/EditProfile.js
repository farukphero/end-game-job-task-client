import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import { RiAccountCircleFill } from "react-icons/ri";
 
const EditProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="lg:w-10/12 mx-auto my-20">
      <div className="lg:flex">
        <div className="flex justify-center">
          <figure className="lg:px-10">
            {user ? (
              <img
                src={user?.photoURL}
                alt=""
                className="rounded-full h-40 w-40"
              />
            ) : (
              <RiAccountCircleFill className="h-40 w-40" />
            )}

            <input type="file"  name="" id="" className="p-3 w-28" />
          </figure>
        </div>
        <div className="lg:ml-10 mx-5 lg:mx-0 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div>
              <h2 className="flex justify-start my-2">Full Name</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={user?.displayName}
                className="input input-bordered w-full lg:w-96"
              />
            </div>

            <div>
              <h2 className="flex justify-start mt-3 mb-2">
                Email Address (Email Address cannot be changed)
              </h2>

              <input
                type="text"
                placeholder="Full Name"
                value={user?.email}
                className="input input-bordered  w-full lg:w-96"
                disabled
              />
            </div>
            <div>
              <h2 className="flex justify-start mt-3 mb-2">Phone Number</h2>

              <input
                type="text"
                placeholder="+880........"
                className="input input-bordered  w-full lg:w-96"
              />
            </div>
            <div>
              <h2 className="flex justify-start mt-3 mb-2">Education</h2>

              <input
                type="text"
                placeholder="University/College"
                className="input input-bordered  w-full lg:w-96"
              />
            </div>
          </div>
          <div>
            <div>
              <h2 className="flex justify-start my-2">Present Address</h2>

              <input
                type="text"
                placeholder="District"
                className="input input-bordered  w-full lg:w-96"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Division"
                className="input input-bordered  w-full lg:w-96 mt-2"
              />
            </div>

            <div>
              <h2 className="flex justify-start my-2">Permanent Address</h2>

              <input
                type="text"
                placeholder="District"
                className="input input-bordered  w-full lg:w-96"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Division"
                className="input input-bordered  w-full lg:w-96 mt-2"
              />
            </div>
            <div>
              <h2 className="flex justify-start my-2">Nationality</h2>

              <input
                type="text"
                placeholder="Nationality"
                className="input input-bordered  w-full lg:w-96"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button className="btn">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

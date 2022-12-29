import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import { RiAccountCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpdatedInfo = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const education = form.education.value;
    const presentDistrict = form.presentDistrict.value;
    const presentDivision = form.presentDivision.value;
    const permanentDistrict = form.permanentDistrict.value;
    const permanentDivision = form.permanentDivision.value;
    const nationality = form.nationality.value;

    const profile = {
      name,
      email,
      phone,
      education,
      presentDistrict,
      presentDivision,
      permanentDistrict,
      permanentDivision,
      nationality,
    };
 

    fetch(`https://end-game-job-task-server.vercel.app/profileInfo/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("changed successful")
        navigate("/");
      });
  };
  return (
    <div className="lg:w-10/12 mx-auto">
      <div>
        <div className="flex justify-center">
          <figure className=" ">
            {user?.photoURL && (
              <img
                src={user?.photoURL}
                alt=""
                className="rounded-full h-40 w-40"
              />
            )}
            {!user?.photoURL && <RiAccountCircleFill className="w-40 h-40 " />}

            <input type="file" name="" id="" className="p-3 w-28" />
          </figure>
        </div>
        <form onSubmit={handleUpdatedInfo}>
          <div>
            <h2 className="flex justify-start my-2">Full Name</h2>
            <input
              name="name"
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
              name="email"
              type="email"
              value={user?.email}
              className="input input-bordered  w-full lg:w-96"
              disabled
            />
          </div>
          <div>
            <h2 className="flex justify-start mt-3 mb-2">Phone Number</h2>

            <input
              name="phone"
              type="text"
              placeholder="+880........"
              className="input input-bordered  w-full lg:w-96"
            />
          </div>
          <div>
            <h2 className="flex justify-start mt-3 mb-2">Education</h2>

            <input
              name="education"
              type="text"
              placeholder="University/College"
              className="input input-bordered  w-full lg:w-96"
            />
          </div>

          <div>
            <h2 className="flex justify-start my-2">Present Address</h2>

            <input
              name="presentDistrict"
              type="text"
              placeholder="District"
              className="input input-bordered  w-full lg:w-96"
            />
          </div>
          <div>
            <input
              name="presentDivision"
              type="text"
              placeholder="Division"
              className="input input-bordered  w-full lg:w-96 mt-2"
            />
          </div>

          <div>
            <h2 className="flex justify-start my-2">Permanent Address</h2>

            <input
              name="permanentDistrict"
              type="text"
              placeholder="District"
              className="input input-bordered  w-full lg:w-96"
            />
          </div>
          <div>
            <input
              name="permanentDivision"
              type="text"
              placeholder="Division"
              className="input input-bordered  w-full lg:w-96 mt-2"
            />
          </div>
          <div>
            <h2 className="flex justify-start my-2">Nationality</h2>

            <input
              name="nationality"
              type="text"
              placeholder="Nationality"
              className="input input-bordered  w-full lg:w-96"
            />
          </div>
          <div className="flex justify-end mt-4">
            <input className="btn" type="submit" value="Save Changes" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

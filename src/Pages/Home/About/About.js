// import React, { useContext } from "react";
// import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
// import { RiAccountCircleFill } from "react-icons/ri";
// import Loading from "../../../Loading/Loading";
// import { Link } from "react-router-dom";

// const About = () => {
//   const { user } = useContext(AuthContext);
//   return (
//     <div className="lg:w-8/12 mx-auto my-20">
//       <div className="lg:flex">
//         <div className="flex justify-center">
//           <figure className="lg:px-10">
//             {user ? (
//               <img
//                 src={user?.photoURL}
//                 alt=""
//                 className="rounded-full h-40 w-40"
//               />
//             ) : (
//               <RiAccountCircleFill className="h-40 w-40" />
//             )}

//             <Link to='/EditProfile' className="btn btn-sm mt-5">Edit Profile</Link>
//           </figure>
//         </div>
//         <div className="lg:ml-12 mt-10">
//           <div>
//             <h2 className="flex justify-start">Full Name</h2>
//             <h2 className="flex justify-start mb-3 mt-1 text-xl font-semibold">
//               {user?.displayName}
//             </h2>
//             <h2 className="flex justify-start">Email Address</h2>
//             <h2 className="flex justify-start mb-3 mt-1 text-xl font-semibold">
//               Email: {user?.email}
//             </h2>
//             {/* <h2 className="flex justify-start">University/College</h2>
//           <p className="flex justify-start"> </p> */}
//           </div>
//           <div className="card-actions"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

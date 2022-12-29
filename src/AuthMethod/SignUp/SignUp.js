import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const SignUp = () => {
  const [signUpError, setSignUpError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {createUserByEmail,updateUser, googleLogIn} = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const provider = new GoogleAuthProvider();

  const handleSignUp=(data)=>{
    createUserByEmail(data.email, data.password)
    .then((result) => {
      const user = result.user;
      toast.success('Sign In successful')
      const profile = {
        displayName: data.name,
      };
      updateUser(profile)
      .then(() => {
        saveUser(data.name, data.email);
        toast.success('Sign In successful')

      })
      .catch((error) => {
        console.log(error);
      });
      navigate(from, { replace: true });
    })
    .catch((error) => {
      setSignUpError(error.message);
    });
  }

  const handleGoogleSignUp = () => {
    googleLogIn(provider)
      .then((result) => {
        const user = result.user;
        saveUser(user?.displayName, user?.email);
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  const saveUser = (name, email ) => {
    const user = {
      name,
      email,
    };
    fetch("https://end-game-job-task-server.vercel.app/profileInfo", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(from, { replace: true });
      });
  };
  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="mb-12 lg:max-w-lg lg:pr-5 lg:mb-0">
            <div className="max-w-xl mb-6">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              “Social media is not a media. The key is to listen, engage, and build relationships.”

              </h2>
              <p className="text-base text-gray-700 md:text-lg">
              You as a brand have to be completely confident about your position, because you will get criticism. You will have a negative reaction. If you didn’t get a negative reaction, that means you’re standing neutral and you have no point of view. Who wants to participate in that?
              </p>
            </div>
            <hr className="mb-6 border-gray-300" />
             
          </div>
          <div className="px-5 pt-6 pb-5 text-center border border-gray-300 rounded lg:w-2/5">
          <div className="flex justify-around">
       <Link to='/SignIn' className="mb-5 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">Sign In</Link>
       <p to='/SignUp' className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">Sign Up</p>
       </div>
           <form onSubmit={handleSubmit(handleSignUp)}>
         
              
              <div>
              <label className="label">
                 <span className="label-text">Full Name</span>
               </label>
               <input
               {...register("name", { required: true })}
                 type="text"
                 placeholder="Enter Your Full Name"
                 className="input input-bordered w-full"
               />
                 
 
              </div>
              
             <div>
               
               <label className="label">
                 <span className="label-text">Email</span>
               </label>
               <input
               {...register("email", { required: true })}
                 type="email"
                 placeholder="Enter Your Email"
                 className="input input-bordered w-full"
               />
               </div>
               <div>
               <label className="label">
                 <span className="label-text">Password</span>
               </label>
               <input
               {...register("password", { required: true })}
                 type="password"
                 placeholder="Enter Valid Password"
                 className="input input-bordered w-full"
               />
                {errors.exampleRequired && <span>This field is required</span>}
                <p className="text-red-400 flex justify-start">{signUpError}</p>
               <input className="btn my-3 w-full" type="submit" value="SignUp" />
             </div>
           </form>
            <div className="flex items-center w-full mb-5">
              <hr className="flex-1 border-gray-300" />
              <div className="px-3 text-xs text-gray-500 sm:text-sm">or</div>
              <hr className="flex-1 border-gray-300" />
            </div>
            <button
              onClick={handleGoogleSignUp}
              className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold transition duration-200 bg-white border border-gray-300 rounded md:w-auto hover:bg-gray-100 focus:shadow-outline focus:outline-none"
            >
              Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

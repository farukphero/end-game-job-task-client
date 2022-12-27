import React, { createContext, useEffect, useState } from "react";
import { app } from "../../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser]=useState(null)

    const createUserByEmail =(email, password)=>{
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUserByEmail =(email, password)=>{
       return signInWithEmailAndPassword (auth, email, password)
    }

    const logOut =()=>{
       return signOut(auth)
    }
    const authInfo = {
        user,
        // loading,
        // setLoading,
        createUserByEmail,
        signInUserByEmail,
        logOut,
        // providerGoogleLogIn,
        // updateUser,
        // removeUser
      };
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        //   setLoading(false);
        });
        return () => {
          unsubscribe();
        };
      }, []);
    
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

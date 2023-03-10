import React, { createContext, useEffect, useState } from "react";
import { app } from "../../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser]=useState(null)
    const [loading, setLoading] = useState(true);

    const createUserByEmail =(email, password)=>{
        setLoading(true);
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUserByEmail =(email, password)=>{
        setLoading(true);
       return signInWithEmailAndPassword (auth, email, password)
    }
    const googleLogIn = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
      };
    const updateUser = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile)
      };

    const logOut =()=>{
       return signOut(auth)
    }
    const authInfo = {
        user,
        loading,
        // setLoading,
        createUserByEmail,
        signInUserByEmail,
        logOut,
        googleLogIn,
        updateUser,
        // removeUser
      };
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
        return () => {
          unsubscribe();
        };
      }, []);
    
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

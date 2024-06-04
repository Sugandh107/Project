import React, { createContext,useState,useEffect } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config"


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export  const AuthContext=createContext();


function AuthProvider({children}) {
    const  [user, setUser] = useState('')
    const  [loading, setLoading] = useState(true)
    const [UserName,setUserName]=useState('')
    
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signup with gmail
    const signUpWithGmail = () => {
      setLoading(true);
      return  signInWithPopup(auth, googleProvider)
    }

    // login using email & password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // logout 
    const logOut = () =>{
      return signOut(auth);
  }

    // update profile
    const updateUserProfile = (name, photoURL) => {
      return  updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
          })
    }
    const authInfo={
        user,
        createUser,
        signUpWithGmail,
        login,
        logOut,
        updateUserProfile,
        loading,
        UserName,
        setUserName,
    }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });
  
        return () =>{
            return unsubscribe();
        }
    }, [])

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider >
  )
}

export default AuthProvider
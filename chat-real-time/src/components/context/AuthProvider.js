import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase/config';
import { Spin } from 'antd';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        const unSubscibed = onAuthStateChanged(auth,  (user) => {
          // console.log(user);
            if(user){
                const {displayName, email, uid, photoURL} = user;
                setUser({displayName, email, uid, photoURL});
              navigate("/");
            }else navigate("/login");
          })
          return () => {
            unSubscibed();
          }
    }, [navigate])
    return (
       <AuthContext.Provider
       value={{user}}
       >
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;
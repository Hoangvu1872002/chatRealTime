import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { auth, db } from "../../firebase/config";
import { signInWithPopup, FacebookAuthProvider, onAuthStateChanged, GoogleAuthProvider } 
from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import addDocument, { generateKeywords } from "../../firebase/services";

const { Title } = Typography;
const fbProvider = new FacebookAuthProvider();
const googleProvider =  new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const handleFbLogin =  async(provider) => {
    // auth.signInWithPopup()
    const data = await signInWithPopup(auth, provider).then(console.log("aaa"));
    console.log(data);
    if(data?._tokenResponse.isNewUser){
      addDocument("users",{    
          displayName: data.user.displayName,
          email: data.user.email,
          photoURL: data.user.photoURL,
          uid: data.user.uid,
          providerId: data.providerId,
          keywords: generateKeywords(data.user.displayName),
      })
      }
    
     onAuthStateChanged(auth,  (user) => {
      if(user){
        navigate("/");
      }
    })
  };
  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun Chat
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }} onClick={() => handleFbLogin(googleProvider)}>
            Login by google
          </Button>
          <Button style={{ width: "100%" }} onClick={() => handleFbLogin(fbProvider)}>
            Login by facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;

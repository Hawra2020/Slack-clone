import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material"
import { provider } from "../../firebase";
import { signInWithPopup,getAuth } from "firebase/auth";

function Login() {

    const signIn = (e) => {
       e.preventDefault();
       const auth = getAuth();
      signInWithPopup(auth,provider).catch((error)=>alert(error.message))
    }
    return (
        <LoginContainer>
            <InnerLoginContainer>
                <img src="https://play-lh.googleusercontent.com/mzJpTCsTW_FuR6YqOPaLHrSEVCSJuXzCljdxnCKhVZMcu6EESZBQTCHxMh8slVtnKqo" alt=""></img>
                <h1>Sign in to Slack fam!</h1>

                <Button onClick={signIn}>Sign in with Google</Button>
            </InnerLoginContainer>
        </LoginContainer>
    )
}

export default Login;

const LoginContainer = styled.div`

    display:grid;
    place-items:center;
    border:1px solid grey;
    height:100vh;
`;

const InnerLoginContainer = styled.div`

  text-align:center;
  padding:100px;
  border-radius:10px;
  background-color:white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
> h1 {
    padding-bottom:50px;
}
> img {
     height:100px;
     margin-bottom:40px;
     
 }

 >button {
     margin-top:10px;
     background-color:green;
     color:white;
     border:0.5px solid grey;
 }
`;
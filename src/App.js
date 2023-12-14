import Header from './app/components/Header'
import SideBar from './app/components/SideBar'
import Chat from './app/components/Chat'
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import React from 'react';
import styled from "styled-components";
import { Provider } from 'react-redux';
import { store } from './app/store'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "../src/app/components/Login";
import Spinner from "react-spinkit";



function App() {

  const [user,loading] = useAuthState(auth);

  if(loading) {
    return (
      <AppLoading>
        <AppLoadingContainer>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png" alt=""></img>

          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none"></Spinner>
        </AppLoadingContainer>
      </AppLoading>
    )
  }
  return (
    <Provider store={store}>
    <div>
      <Router>
        {!user? <Login></Login>:
        <>
        <Header></Header>
        <AppBody>
          <SideBar></SideBar>
        <Routes>
          <Route path="/" element={<Chat></Chat>}>
          </Route>
        </Routes>
        </AppBody>
        </>}
      </Router>
    </div>
    </Provider>
  );
}

const AppBody = styled.div`
display:flex;
height:100vw;
`;
export default App;


const AppLoading = styled.div`
   
`;

const AppLoadingContainer = styled.div`

   display:flex;
   flex-direction:column;
   justify-content:center;
   align-items:center;
   margin-top:250px;

   > img {
     height:100px;
     margin-bottom:50px;
   }
`;
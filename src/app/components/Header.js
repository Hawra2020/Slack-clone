import React from "react"
import styled from "styled-components"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Avatar } from "@mui/material";



function Header() {
    const [user] = useAuthState(auth);
   return (
       <div>
           <HeaderContainer>
               {/*  Header left */}
               <HeaderLeft>
                   <HeaderAvatar src={user?.photoURL} onClick={()=>auth.signOut()}></HeaderAvatar>
                   <AccessTimeIcon style={{color:"white"}}></AccessTimeIcon>
               </HeaderLeft>

                {/*  Header middle */}
                <HeaderMiddle>
                  <SearchIcon style={{color:"white",marginLeft:30}}></SearchIcon>
                  <input type="text" placeholder="Search Chats"></input>
                </HeaderMiddle>

                 {/*  Header right */}
                 <HeaderRight>
                    <HelpOutlineOutlinedIcon style={{color:"white"}}></HelpOutlineOutlinedIcon>
                 </HeaderRight>
           </HeaderContainer>
       </div>
   )
}

export default Header

const HeaderContainer = styled.div`
  display:flex;
  border-color : red;
  justify-content:space-between;
  background-color: var(--slack-color);
  width:100%;
  padding-top:10px;
  padding-bottom:10px;
`;
const HeaderLeft = styled.div`
display:flex;
flex:0.3;
justify-content:space-between;
align-items:center;
>.MuiSvgIcon-root{
margin-left:10px;
margin-right:30px;
}

`;
const HeaderAvatar = styled(Avatar)`
cursor : pointer;
margin-left:8px;

:hover {
    opacity : 0.8;
}
`;
const HeaderMiddle = styled.div`
display:flex;
flex:0.4;
align-items:center;
margin-left:250px;
border-radius:10px;
border : 1px grey solid;
background-color:#421f44;
> input {
width:150px;
border:none;
outline:0;
border-color:transparent;
text-align:center;
background-color:transparent;
}

`;
const HeaderRight = styled.div`
display:flex;
flex:0.3;
justify-content:flex-end;

>.MuiSvgIcon-root{
 margin-right:20px
}
`;
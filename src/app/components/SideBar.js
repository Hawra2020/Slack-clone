import React,{ useState } from "react";
import styled from "styled-components";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SideBarOptions from "./SideBarOptions";
import MessageIcon from '@mui/icons-material/Message';
import RecommendIcon from '@mui/icons-material/Recommend';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { db } from "../../firebase";
import { collection } from "firebase/firestore"; 
import { useCollection } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";


function SideBar() {
    const sideBarOptionsArray = [
        {title:'Threads',icon:<MessageIcon></MessageIcon>},
        {title:'Mentions and Reactions',icon:<RecommendIcon></RecommendIcon>},
        {title:'Saved Items',icon:<FolderSpecialIcon></FolderSpecialIcon>},
        {title:'Channel Browser',icon:<BookmarkIcon></BookmarkIcon>},
        {title:'People and User Groups',icon:<PeopleAltIcon></PeopleAltIcon>},
        {title:'Apps',icon:<AppsIcon></AppsIcon>},
        {title:'FileBrowser',icon:<FileCopyIcon></FileCopyIcon>},
        {title:'Show Less',icon:<ExpandLessIcon></ExpandLessIcon>}]

    const [sideBarOptions] = useState(sideBarOptionsArray);

    //Getting all the channels from firebase
    const [channels] = useCollection(collection(db, "rooms"))
    
    const [user] = useAuthState(auth);

    return (
        <SideBarColumn>
            <SideBarHeader>
                <SideBarLeft>
                    <div>
                    <h2>Slack Fam</h2>
                    <div>
                    <FiberManualRecordIcon></FiberManualRecordIcon>
                    <h3>{user?.displayName}</h3>
                    </div>
                    </div>
                </SideBarLeft>
                <SideBarRight>
                   <ModeEditOutlinedIcon></ModeEditOutlinedIcon>
                </SideBarRight>
            </SideBarHeader>
            <SideBarOptionsContainer>
            {sideBarOptions.map((option)=>(
                     <SideBarOptions key={option.title} title={option.title} icon={option.icon}></SideBarOptions>
            ))}
            <hr></hr>
            <SideBarOptions title="Channels" icon={<ExpandMoreIcon></ExpandMoreIcon>}></SideBarOptions>
            <hr></hr>
            <SideBarOptions title="Add Channel" icon={<AddIcon></AddIcon>} addChannelOption ></SideBarOptions>
            {channels?.docs.map((doc)=>(
                <SideBarOptions key={doc.id} id={doc.id} title={doc._document.data.value.mapValue.fields.channelName.stringValue}></SideBarOptions>
                
            ))}
            </SideBarOptionsContainer>
        </SideBarColumn>
    )
}

export default SideBar;



const SideBarColumn = styled.div`
   display:flex;
   flex-direction:column;
   flex:0.135;
   background-color: var(--slack-color);
`

const SideBarHeader = styled.div`

    display:flex;
    height:80px;
    width:100%;
    border-bottom: 1px solid #49274b;
`;

const SideBarLeft = styled.div`
   display:flex;
   flex:0.8;
   align-items:center;


  > div > h2 {
       color:white;
       font-size:15px;
       margin-left:10px;
   }

   > div > div {
    display: flex;
    align-items: center;
    width:100%;
    margin-top:12px;
  }

  > div > div > h3 {
      display:flex;
      color:white;
      font-size:10px;
      margin-left:10px;
   }

   > div > div > .MuiSvgIcon-root{
       display:flex;
       background-color:green;
       border-radius:15px;
       margin-left:10px;
       font-size:10px;
       color:green;
   }
`;

const SideBarRight = styled.div`
display:flex;
flex:0.5;
align-items:center;
justify-content:flex-end;
margin-right:10px;

>.MuiSvgIcon-root{
    color:white;
    border-radius:10px;
    cursor:pointer;
    border:1px white solid;
    padding: 2px 2px 2px 2px;
    background-color:white;
    color:black;
}`;

const SideBarOptionsContainer = styled.div`
cursor:pointer;
:hover {
    opacity:0.9;
    background-color:#340e36;
}
> hr {
    margin-top:20px;
    border:1px solid #49274b ;
}

`;

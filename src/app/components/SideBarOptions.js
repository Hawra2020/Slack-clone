import React from "react"
import styled from "styled-components";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore"; 
import { useDispatch } from "react-redux";
import { enterRoom } from "../../features/counter/appSlice";





function SideBarOptions({title,icon,addChannelOption,id}) {

//using dispatch
const dispatch = useDispatch();

//function to add channels/chatrooms in firebase
const addChannelName = async () => {
    const channelName = prompt("Please enter channel name")
    
    if(channelName){
        try {
            const docRef = await addDoc(collection(db, "rooms"), {
             channelName:channelName
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          
    }
}

const selectChannel = () => {
    //id imported as a prop
    if(id){
        console.log("The channel id is ",id)
        dispatch(enterRoom({
            roomId : id
        }))
    }
}


return (
        <SideBarOptionsContainer onClick={addChannelOption?addChannelName:selectChannel}>
            {icon?<>{icon}
            <h3>{title}</h3></>:<SideBarChannelOptions><h3>#{title}</h3></SideBarChannelOptions>}
            
        </SideBarOptionsContainer>
    )
}

export default SideBarOptions;

const SideBarOptionsContainer = styled.div`
margin-top:15px;
display:flex;
height:25px;
align-items:center;

>.MuiSvgIcon-root{
    margin-left:10px;
    color:white;
    font-size:15px;
}

> h3 {
    margin-left:10px;
    color:white;
    font-size:10px;
}

`;

const SideBarChannelOptions = styled.div`

> h3 {
    color:white;
    font-size:10px;
    font-weight:500;
    margin-left:35px;
}
`;


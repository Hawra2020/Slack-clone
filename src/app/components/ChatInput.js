import React, { useState } from "react"
import styled from "styled-components"
import Button from '@mui/material/Button';
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore"; 
import { db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";


function ChatInput({channelName,channelId,chatRef}) {


    //declaring a state variable for grabbing the current message input
    const [message,setMessage] = useState("")

    const [user] = useAuthState(auth)

    const handleInputChange = (e) => {
         setMessage(e.target.value)
    }

    const sendMessage = async (e) => {
       e.preventDefault()

       //if channel id does not exist
       if(!channelId){
           return false
       }

       //sending the messages to firebase
       await setDoc(doc(collection(db,"rooms",channelId,"messages")),{
           message : message,
           timestamp : serverTimestamp(),
           user : user?.displayName,
           userImage : user?.photoURL
       })

       //clearing the input box after sending the message
       setMessage("")

       //scroll the window after sending the message
       chatRef?.current?.scrollIntoView({
           behavior : "smooth"
       })
    }
    return (
        <ChatInputContainer>
            <form action="submit">
                <input placeholder={`Message Room ${channelName}`} value={message} onChange={handleInputChange}></input>
                <Button hidden type="submit" onClick={sendMessage}>SEND</Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput;


const ChatInputContainer = styled.div`
position:relative;
display:flex;
> form > input {
    position:fixed;
    bottom:30px;
    width:70%;
    margin-left:10px;
    border:1px solid grey;
    border-radius:5px;
    padding:20px;
    outline:none;
}

>form >button {
    display:none !important;
}
`;
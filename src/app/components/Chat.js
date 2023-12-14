import React, { useEffect,useRef,useState } from "react"
import styled from "styled-components"
import ChatInput from "./ChatInput"
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from "react-redux";
import { selectedRoomId } from "../../features/counter/appSlice";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { collection,doc,query,getDoc,orderBy } from "@firebase/firestore";






function Chat() {
    
    const chatRef = useRef(null);

    //declaring the variable for channelName
    const [channelName, setChannelName] = useState(null);

    //Grabbing the roomid from the store
    const channelId = useSelector(selectedRoomId)

    //Grabbing channel name from channel Id
    const getChannelName = async (channelId) => {
        if (!channelId) {
          // Handle the case where channelId is not provided
          return null;
        }
      
        const roomDocRef = doc(db, 'rooms', channelId);
        const roomSnapshot = await getDoc(roomDocRef);
      
        if (roomSnapshot.exists()) {
          // The document exists, you can access its data
          const channelName = roomSnapshot.data().channelName;
          return channelName;
        } else {
          // Handle the case where the document doesn't exist
          return null;
        }
      };

      const messagesRef = collection(db, `rooms/${channelId}/messages`);
      const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));
      const [messages,loading] = useCollectionData(messagesQuery, { idField: 'id' });
      console.log(messages)

    useEffect(() => {
        const fetchData = async () => {
          const name = await getChannelName(channelId);
          setChannelName(name);
        };
        fetchData();
        chatRef?.current?.scrollIntoView({
            behavior : "smooth"
        });
      }, [channelId,loading]);

    return (
       <ChatComponent>
           <ChatBoxHeader>
               <ChatHeaderLeft>
                  <StarOutlineIcon></StarOutlineIcon>
                   <strong>#{channelName}</strong>
               </ChatHeaderLeft>
               <ChatHeaderRight>
                   <InfoOutlinedIcon></InfoOutlinedIcon>
                   <p>Details</p>
               </ChatHeaderRight>
           </ChatBoxHeader>
           <ChatMessages>
               {messages?.map((message)=>(
                   <div>
                       <span>
                           <img src={message.userImage} alt=""></img>
                           <h3>{message?.user}</h3>
                           <p>{new Date(message?.timestamp?.toDate()).toUTCString()}</p>
                        </span>
                        
                        <h3>{message?.message}</h3>
                        <br></br>
                   </div>
               ))}
           </ChatMessages>

           <ChatBottom ref={chatRef}></ChatBottom>
           <ChatInput channelId={channelId} channelName={channelName} chatRef={chatRef}></ChatInput>
       </ChatComponent>
    )
}


export default Chat;



const ChatComponent = styled.div`
flex:0.7;
margin-left:15px;
margin-top:15px;
flex-grow:1;
overflow-y:scroll;
`;

const ChatBoxHeader = styled.div`
    display:flex;
    justify-content:space-between;
    border-bottom:1px solid lightgrey;
    padding:20px;
`;

const ChatHeaderRight = styled.div`
  display:flex;
  flex:0.5;
  align-items:center;

  > p {
     margin-left:20px;
  }

  >.MuiSvgIcon-root {
  }
`;

const ChatHeaderLeft = styled.div`
  display:flex;
  flex:0.5;
  align-items:center;

  > strong {
      margin-left:20px;
  }

  >.MuiSvgIcon-root {
  }
`;

const ChatMessages = styled.div`

> div {
    margin-top:10px;
> span {
    display:flex;
    align-items:center;

> img {
    height:30px;
    border-radius:20px;
}
  
  > h3 {
      margin-left:10px;
      font-weight:50;
      font-size:10px;
  }
  > p {
      margin-left:20px;
      font-weight:300;
      font-size:8px;
      color:grey
  }
}

> h3 {
    padding-top:10px;
    font-weight:20;
    font-size:12px;
    color:black;
    margin-right:150px;
}
}
    
`;

const ChatBottom = styled.div`
padding-bottom:200px;
`;

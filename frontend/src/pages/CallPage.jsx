import React, { useEffect, useState } from "react";
import useAuthuser from "../hooks/useAuthuser";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getStreamToken } from "../lib/api";
import Loader from "../components/Loader";
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  SpeakerLayout,
  StreamTheme,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
const STREAM_API_KEY = import.meta.env.VITE_STEAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient ] = useState(null);
  const [ call, setCall ] = useState(null);
  const [isConnecting, setisConnecting ] = useState(true);
  const { authUser, isLoading } = useAuthuser();

  const { data: token } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,

    enabled: !!authUser, //load when authuser available
  });

  useEffect(() => {
    const initChat = async () => {
      if (!token || !authUser || !callId) return;

      try {
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token,
        });
        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });
        setClient(videoClient);
        setCall(callInstance);
        console.log("successfully initilizing ")
      } catch (error) {
        console.log("error in initilizing call channel",error);
        toast.error("could'nt join,try again");
      } finally {
      setisConnecting(false)
      }
    };
    initChat();
  }, [token, authUser, callId]);
  if (isLoading || isConnecting) return <Loader />;

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent/>
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex h-full justify-center items-center ">
            <p>could not connect , try again</p>
          </div>
        )}
      </div>
    </div>
  );
};


const CallContent=()=>{
 
  const {useCallCallingState}=useCallStateHooks()
  const callingState=useCallCallingState();
  const navigate=useNavigate();
  if(callingState=== CallingState.LEFT) return navigate("/")
    return(
  <StreamTheme>
    <SpeakerLayout/>
    <CallControls/>
  </StreamTheme>

)
}


export default CallPage;

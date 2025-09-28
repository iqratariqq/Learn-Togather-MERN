import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthuser from "../hooks/useAuthuser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  Channel,
  Chat,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import ChatLoading from "../components/ChatLoading";
import CallButton from "../components/CallButton";
import toast from "react-hot-toast";


const STREAM_API_KEY = import.meta.env.VITE_STEAM_API_KEY;
const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthuser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,

    enabled: !!authUser, //load when authuser available
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData || !authUser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData
        );

        const channelId = [authUser._id, targetUserId].sort().join("_");

        const currentChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });
        await currentChannel.watch();
        setChatClient(client);
        setChannel(currentChannel);
      } catch (error) {
        console.log("error in initilizing channel");
      } finally {
        setLoading(false);
      }
    };
    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
if(channel){
  const callUrl=`${window.location.origin}/call/${channel.id}`
  channel.sendMessage({
    text:`join me here: ${callUrl}`
  })
  toast.success("video call link send successfully")
}
  };

  if (loading || !chatClient || !channel) return <ChatLoading />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full  relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;

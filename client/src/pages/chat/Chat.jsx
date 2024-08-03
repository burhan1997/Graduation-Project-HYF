import React, { useContext, useState, useEffect } from "react";
import SBConversation from "@sendbird/uikit-react/GroupChannel";
import SBChannelList from "@sendbird/uikit-react/GroupChannelList";
import SBChannelSettings from "@sendbird/uikit-react/ChannelSettings";
import SendBird from "sendbird";
import "./Chat.css";
import { UserContext } from "../../context/userContext";

export const Chat = () => {
  const { user } = useContext(UserContext);
  const [userId, setUserId] = useState(null);
  const [currentChannelUrl, setCurrentChannelUrl] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const appId = process.env.REACT_APP_SENDBIRD_APP_ID;
  const [sb, setSb] = useState(null);
  const targetedUserId = "targeted_user_id_2"; // The ID of the targeted user

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      const sbInstance = new SendBird({ appId });
      sbInstance.connect(userId, (connectedUser, error) => {
        if (error) {
          //  console.error('Error connecting:', error);
          return;
        }
        //console.log("Connection successful:", connectedUser);
        setSb(sbInstance);
      });
    }
  }, [userId, appId]);

  useEffect(() => {
    if (sb && targetedUserId) {
      createOrGetChannelWithUser(targetedUserId);
    }
  }, [sb, targetedUserId]);

  const createOrGetChannelWithUser = (targetUserId) => {
    const params = new sb.GroupChannelParams();
    //console.log("params:", params )
    params.isDistinct = true;
    params.addUserIds([userId, targetUserId]);
    params.operatorUserIds = [userId];
    //params.members=[userId, targetUserId]
    params.name = "Private Chat";

    sb.GroupChannel.createChannel(params, (groupChannel, error) => {
      if (error) {
        //   console.error('Error creating channel:', error);
        return;
      }
      //  console.log("Channel created:", groupChannel);
      setCurrentChannelUrl(groupChannel.url);
    });
  };

  return (
    <div className="customized-app">
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <SBChannelList
            selectedChannelUrl={currentChannelUrl}
            onChannelCreated={(channel) => {
              setCurrentChannelUrl(channel.url);
            }}
            onChannelSelect={(channel) => {
              setCurrentChannelUrl(channel?.url);
            }}
          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          <SBConversation
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true);
            }}
          />
        </div>
      </div>
      {showSettings && (
        <div className="sendbird-app__settingspanel-wrap">
          <SBChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              setShowSettings(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

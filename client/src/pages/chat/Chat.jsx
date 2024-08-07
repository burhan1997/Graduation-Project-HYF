import React, { useContext, useState, useEffect } from "react";
import SBConversation from "@sendbird/uikit-react/GroupChannel";
import SBChannelList from "@sendbird/uikit-react/GroupChannelList";
import SBChannelSettings from "@sendbird/uikit-react/ChannelSettings";
import SendBird from "sendbird";
import "./Chat.css";
import { UserContext } from "../../context/userContext";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { createOrGetChannelWithUser } from "../../util/createOrGetChannelWithUser";

export const Chat = () => {
  const { user } = useContext(UserContext);
  const [userId, setUserId] = useState(null);
  const [currentChannelUrl, setCurrentChannelUrl] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const appId = process.env.REACT_APP_SENDBIRD_APP_ID;
  const [sb, setSb] = useState(null);
  const [targetedUserId, setTargetedUserId] = useState(null);
  const [targetedUserName, setTargetedUserName] = useState(null);
  const { id } = useParams();

  //set the targeted user id
  useEffect(() => {
    if (id) {
      setTargetedUserId(id);
    }
  }, [id]);

  const onReceived = (data) => {
    setTargetedUserName(data?.user?.firstName);
  };

  const { performFetch } = useFetch(`/user/${targetedUserId}`, onReceived);

  useEffect(() => {
    if (targetedUserId) {
      performFetch({ method: "GET" });
    }
  }, [targetedUserId]);

  //get current user id
  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);
  //connect to the sendbird
  useEffect(() => {
    if (userId) {
      const sbInstance = new SendBird({ appId });
      if (targetedUserId) {
        sbInstance.connect(targetedUserId, (connectedUser, error) => {
          if (error) {
            return;
          }

          setSb(sbInstance);
        });
      } else {
        sbInstance.connect(userId, (connectedUser, error) => {
          if (error) {
            return;
          }

          setSb(sbInstance);
        });
      }
    }
  }, [userId, appId]);

  //create channel with the targeted user
  useEffect(() => {
    if (sb && targetedUserId) {
      createOrGetChannelWithUser({
        sb,
        userId,
        targetedUserId,
        name: targetedUserName,
        setCurrentChannelUrl,
      });
    }
  }, [sb, targetedUserId]);

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

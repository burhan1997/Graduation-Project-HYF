import React, { useContext, useState, useEffect } from "react";
import SBConversation from "@sendbird/uikit-react/GroupChannel";
import SBChannelList from "@sendbird/uikit-react/GroupChannelList";
import SBChannelSettings from "@sendbird/uikit-react/ChannelSettings";
import SendBird from "sendbird";
import "./Chat.css";
import { UserContext } from "../../context/userContext";
import { MessageContext } from "../../context/messageContext"; // Import context
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { createOrGetChannelWithUser } from "../../util/createOrGetChannelWithUser";

export const Chat = () => {
  const { user } = useContext(UserContext);
  const { setNewMessageCount } = useContext(MessageContext);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentChannelUrl, setCurrentChannelUrl] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const appId = process.env.REACT_APP_SENDBIRD_APP_ID;
  const [sb, setSb] = useState(null);
  const [targetedUserId, setTargetedUserId] = useState(null);
  const [targetedUserName, setTargetedUserName] = useState(null);
  const { id } = useParams();

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
          setError(error);
          return;
        }

        setSb(sbInstance);

        const HANDLER_ID = `chat_handler_${userId}`;
        const channelHandler = new sbInstance.ChannelHandler();

        channelHandler.onMessageReceived = (channel) => {
          if (channel.url !== currentChannelUrl) {
            setNewMessageCount((prevCount) => prevCount + 1);
          }
        };
        sbInstance.addChannelHandler(HANDLER_ID, channelHandler);
      });

      return () => {
        if (sbInstance) {
          const HANDLER_ID = `chat_handler_${userId}`;
          sbInstance.removeChannelHandler(HANDLER_ID);
        }
      };
    }
  }, [userId, appId, currentChannelUrl]);

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
          {/* error handling */}
          {error && <div className="error">{error.toString()}</div>}
          <SBChannelList
            selectedChannelUrl={currentChannelUrl}
            onChannelCreated={(channel) => {
              setCurrentChannelUrl(channel.url);
            }}
            onChannelSelect={(channel) => {
              setCurrentChannelUrl(channel?.url);
              setNewMessageCount(0);
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

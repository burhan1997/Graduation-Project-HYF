export const createOrGetChannelWithUser = ({
  sb,
  userId,
  targetedUserId,
  name,
  setCurrentChannelUrl,
}) => {
  const params = new sb.GroupChannelParams();
  params.isDistinct = true;
  params.addUserIds([userId, targetedUserId]);
  params.operatorUserIds = [userId];
  params.name = name;

  sb.GroupChannel.createChannel(params, (groupChannel, error) => {
    if (error) {
      return;
    }
    setCurrentChannelUrl(groupChannel.url);
  });
};

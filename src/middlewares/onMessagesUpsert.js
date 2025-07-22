exports.onMessagesUpsert = ({ socket, messages }) => {
  if (!messages.length) {
    return;
  }
  const WebMessage = messages[0];
};

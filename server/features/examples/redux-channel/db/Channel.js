const channels = [];

const Channel = (id) => {
    const channel = channels.find(channel => channel.id === id);
    if (!channel) {
        throw new Error(`Could not find channel with ID ${id}`);
    }
    return channel;
}

module.exports = {
    channels, Channel
}
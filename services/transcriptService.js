const fs = require('fs');

module.exports = {
    async createTranscript(channel, nomor) {
        const messages = await channel.messages.fetch({ limit: 100 });
        let content = '';

        messages.reverse().forEach(msg => {
            content += `[${msg.author.tag}] : ${msg.content}\n`;
        });

        const fileName = `transcript-${nomor}.txt`;
        fs.writeFileSync(fileName, content);

        return fileName;
    }
};
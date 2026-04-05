const db = require('../config/database');

module.exports = {

    async hasOpenTicket(userId) {
        const [rows] = await db.query(
            'SELECT * FROM tickets WHERE user_id=? AND status="open"',
            [userId]
        );
        return rows.length > 0;
    },

    async createTicket(userId, channelId, number, category) {
        await db.query(
            'INSERT INTO tickets (user_id, channel_id, ticket_number, category) VALUES (?,?,?,?)',
            [userId, channelId, number, category]
        );
    },

    async getTicketByNumber(number) {
        const [rows] = await db.query(
            'SELECT * FROM tickets WHERE ticket_number=? AND status="open"',
            [number]
        );
        return rows[0];
    },

    async closeTicket(number) {
        await db.query(
            'UPDATE tickets SET status="closed" WHERE ticket_number=?',
            [number]
        );
    },

    async claimTicket(channelId, adminId) {
        await db.query(
            'UPDATE tickets SET claimed_by=? WHERE channel_id=?',
            [adminId, channelId]
        );
    },

    async createTicketWithNumber(userId, channelId, category) {

    const [result] = await db.query(
        'INSERT INTO tickets (user_id, channel_id, category) VALUES (?,?,?)',
        [userId, channelId, category]
    );

    const id = result.insertId;

    const ticketNumber = id.toString().padStart(4, '0');

    await db.query(
        'UPDATE tickets SET ticket_number=? WHERE id=?',
        [ticketNumber, id]
    );

    

    return ticketNumber;
    },
    async updateEmail(channelId, email) {
            await db.query(
                'UPDATE tickets SET email=? WHERE channel_id=?',
                [email, channelId]
            );
    }
    
};
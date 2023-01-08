import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize('postgres://andrew@localhost:5432/pxls');

export const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, unique: {
        name: 'users_unique_name'
    } },
    username: { type: DataTypes.TEXT, allowNull: false },
    signup_time: { type: DataTypes.TIME, allowNull: false, defaultValue: new Date() },
    cooldown_expiry: { type: DataTypes.TIME },
    ban_expiry: { type: DataTypes.TIME },
    signup_ip: { type: DataTypes.INET },
    last_ip: { type: DataTypes.INET },
    last_ip_alert: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    perma_chat_banned: { type: DataTypes.BOOLEAN, defaultValue: false },
    chat_ban_expiry: { type: DataTypes.TIME, defaultValue: new Date() },
    chat_ban_reason: { type: DataTypes.TEXT },
    ban_reason: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    user_agent: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    stacked: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_rename_requested: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    discord_name: { type: DataTypes.TEXT },
    chat_name_color: { type: DataTypes.INTEGER, allowNull: false },
    displayed_faction: { type: DataTypes.INTEGER },
    faction_restricted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    is_shadow_banned: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    login_with_ip: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    pixel_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    pixel_count_alltime: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
}, {
    timestamps: false
});

export const CanvasReport = sequelize.define('reports', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    who: { type: DataTypes.INTEGER},
    x: { type: DataTypes.INTEGER },
    y: { type: DataTypes.INTEGER },
    message: { type: DataTypes.TEXT },
    pixel_id: { type: DataTypes.INTEGER },
    reported: { type: DataTypes.INTEGER },
    claimed_by: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    closed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    time: { type: DataTypes.INTEGER }
}, {
    timestamps: false
});

export const ChatReport = sequelize.define('chat_reports', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    time: { type: DataTypes.INTEGER },
    report_message: { type: DataTypes.TEXT, allowNull: false },
    target: { type: DataTypes.INTEGER, allowNull: false },
    initiator: { type: DataTypes.INTEGER, allowNull: false },
    claimed_by: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    closed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    cmid: { type: DataTypes.BIGINT, allowNull: false }
}, {
    timestamps: false
});

export async function getCanvasReports(limit = 10, offset = 0, closed = false) {
    const query = await sequelize.query(`
        SELECT
            r.*,
            u1.username as reported_name,
            u2.username as reporter_name,
            u3.username as claimed_by_name
        FROM
            reports r
        LEFT JOIN users u1 ON r.reported = u1.id
        LEFT JOIN users u2 ON r.who = u2.id
        LEFT JOIN users u3 ON r.claimed_by = u3.id
        WHERE
            r.closed = :closed
        ORDER BY r.id DESC
        LIMIT :limit OFFSET :offset
    `, {
        model: CanvasReport,
        mapToModel: true,
        replacements: { closed, limit, offset }
    });
    const countQuery = await sequelize.query(`
        SELECT
            COUNT(*)
        FROM
            reports
        WHERE
            closed = :closed
    `, {
        replacements: { closed }
    });
    return { results: query, count: countQuery[0][0].count };
}

export async function getChatReports(limit = 10, offset = 0, closed = false) {
    const query = await sequelize.query(`
        SELECT
            r.*,
            u1.username as target_name,
            u2.username as initiator_name,
            u3.username as claimed_by_name
        FROM
            chat_reports r
        LEFT JOIN users u1 ON r.target = u1.id
        LEFT JOIN users u2 ON r.initiator = u2.id
        LEFT JOIN users u3 ON r.claimed_by = u3.id
        WHERE
            r.closed = false
        ORDER BY r.id DESC
    `, {
        model: ChatReport,
        mapToModel: true
    });
    const countQuery = await sequelize.query(`
        SELECT
            COUNT(*)
        FROM
            chat_reports
        WHERE
            closed = :closed
    `, {
        replacements: { closed }
    });
    return { results: query, count: countQuery[0][0].count };
}

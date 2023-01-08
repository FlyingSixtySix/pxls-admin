import { version, author } from '../../package';

import * as dotenv from 'dotenv';
dotenv.config()

export async function load() {
    return {
        session: {
            user: {
                id: 21545,
                username: 'Vanilla'
            }
        },
        version,
        author
    };
}

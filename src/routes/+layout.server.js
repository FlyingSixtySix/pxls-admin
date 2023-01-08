import { version, author } from '../../package';

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

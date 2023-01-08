import { error } from '@sveltejs/kit';
import * as db from '../../../lib/database';
 
/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const type = url.searchParams.get('type') || 'canvas';
    const limit = Number(url.searchParams.get('limit') ?? 10);
    const offset = Number(url.searchParams.get('offset') ?? 0);

    if (isNaN(limit) || limit < 10 || limit > 100) {
        throw error(400, 'limit must be a number and within the range (10, 100)');
    }

    if (isNaN(offset) || offset < 0) {
        throw error(400, 'offset must be a number and within the range (0, Infinity)');
    }
    
    let results = [];
    let count = 0;

    if (type === 'canvas') {
        ({ results, count } = await db.getCanvasReports(limit, offset));
    } else if (type === 'chat') {
        ({ results, count } = await db.getChatReports(limit, offset));
    }

    return new Response(JSON.stringify({ results, count }));
}

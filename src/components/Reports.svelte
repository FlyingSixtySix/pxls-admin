<script>
    import { h } from 'gridjs';
    import Grid from 'gridjs-svelte';

    import 'jquery';

    import moment from 'moment';

    export let type;

    let columns;
    // let gridData;
    
    if (type === 'canvas') {
        columns = [
            {
                name: 'ID',
                formatter: id => {
                    return h('a', {
                        href: '',
                        onClick: () => alert('Clicked! Report ID: ' + id)
                    }, id);
                }
            },
            {
                name: 'Reporter',
                formatter: ({ id, name }) => {
                    if (!id) {
                        return h('span', {}, name);
                    }
                    return h('a', {
                        href: '',
                        onClick: () => alert('Clicked! ID to look up: ' + id)
                    }, name);
                }
            },
            {
                name: 'Reported',
                formatter: ({ id, name }) => {
                    return h('a', {
                        href: '',
                        onClick: () => alert('Clicked! ID to look up: ' + id)
                    }, name);
                }
            },
            {
                name: 'Position',
                formatter: ({ x, y, has }) => {
                    return h('a', {
                        href: '',
                        onClick: () => alert(`Clicked! Pixel to go to: (${x}, ${y})`)
                    }, has ? `(${x}, ${y})` : '');
                }
            },
            {
                name: 'Time',
                formatter: timestamp => {
                    return h('span', {}, moment.unix(timestamp).fromNow());
                }
            },
            {
                name: 'Actions',
                formatter: ({ id, claimedByName }) => {
                    return h('button', {
                        className: 'btn btn-primary btn-sm reports-btn',
                        type: 'button',
                        disabled: claimedByName != null,
                        onClick: () => alert(`Clicked! Open report ${id}`)
                    }, claimedByName != null ? `Claimed by ${claimedByName}` : 'Details');
                }
            }
        ];
    } else if (type === 'chat') {
        columns = [
            {
                name: 'ID',
                formatter: id => {
                    return h('a', {
                        href: '',
                        onClick: () => alert('Clicked! Report ID: ' + id)
                    }, id);
                }
            },
            {
                name: 'Reporter',
                formatter: ({ id, name }) => {
                    if (!id) {
                        return h('span', {}, name);
                    }
                    return h('a', {
                        href: '',
                        onClick: () => alert('Clicked! ID to look up: ' + id)
                    }, name);
                }
            },
            {
                name: 'Reported',
                formatter: ({ id, name }) => {
                    return h('a', {
                        href: '',
                        onClick: () => alert('Clicked! ID to look up: ' + id)
                    }, name);
                }
            },
            {
                name: 'Time',
                formatter: timestamp => {
                    return h('span', {}, moment.unix(timestamp).fromNow());
                }
            },
            {
                name: 'Actions',
                formatter: ({ id, claimedByName }) => {
                    return h('button', {
                        className: 'btn btn-primary btn-sm reports-btn',
                        type: 'button',
                        disabled: claimedByName != null,
                        onClick: () => alert(`Clicked! Open report ${id}`)
                    }, claimedByName != null ? `Claimed by ${claimedByName}` : 'Details');
                }
            }
        ];
    }
</script>

<Grid
    {columns}
    width=1
    className={{
        table: 'reports-table',
        th: 'reports-th',
        td: 'reports-td'
    }}
    pagination={{
        enabled: true,
        limit: 10,
        summary: false,
        server: {
            url: (prev, page, limit) => `${prev}?type=${type}&limit=${limit}&offset=${page * limit}`
        }
    }}
    server={{
        url: '/api/reports',
        then: data => data.results.map(row => {
            if (type === 'canvas') {
                return {
                    id: row.id,
                    reporter: { id: row.who, name: row.reporter_name || 'System' },
                    reported: { id: row.reported, name: row.reported_name },
                    position: { x: row.x, y: row.y, has: row.who != 0 },
                    time: parseInt(row.time),
                    actions: { id: row.id, claimedByName: row.claimed_by_name }
                };
            } else if (type === 'chat') {
                return {
                    id: row.id,
                    reporter: { id: row.initiator, name: row.initiator_name || 'System' },
                    reported: { id: row.target, name: row.target_name },
                    time: parseInt(row.time),
                    actions: { id: row.id, claimedByName: row.claimed_by_name }
                };
            }
        }),
        total: data => data.count
    }}
/>

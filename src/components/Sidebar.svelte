<script>
    import SidebarLink from './SidebarLink.svelte';

    export let session;

    let showUser = false;
</script>

<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="/" class="brand-link bg-red">
        <span class="brand-text">
            <span class="font-weight-light">pxls</span><span class="font-weight-bold">Admin</span>
        </span>
    </a>

    <div class="sidebar">
        {#if showUser}
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="info">
                    <a href="/users/{session.user.id}" class="d-block">{session.user.username}</a>
                </div>
            </div>
        {/if}

        <div class="form-inline" class:mt-3={!showUser}>
            <div class="input-group" data-widget="sidebar-search">
                <input
                    class="form-control form-control-sidebar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <div class="input-group-append">
                    <button class="btn btn-sidebar">
                        <i class="fas fa-search fa-fw" />
                    </button>
                </div>
            </div>
        </div>

        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-header">Main Navigation</li>
                <SidebarLink label="Dashboard" href="/" icon="far fa-rectangle-list" />
                <SidebarLink label="Reports" href="/reports" icon="far fa-bell" />
                <SidebarLink label="Chat" href="/chat" icon="far fa-comments" />
                <SidebarLink label="Notifications" href="/notifications" icon="far fa-envelope" />
                <SidebarLink label="Factions" href="/factions" icon="far fa-flag" />
                <SidebarLink label="Pixels" href="/pixels" icon="far fa-clone" />
                <SidebarLink label="Logs" href="/logs" icon="fa fa-list" />
            </ul>
        </nav>
    </div>
</aside>

<style>
.brand-link {
    text-align: center;
}
</style>

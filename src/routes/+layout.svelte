<script>
    import { onMount } from 'svelte';
    import 'admin-lte';
    import '@fortawesome/fontawesome-free/js/all';
    import Navbar from '../components/Navbar.svelte';
    import Sidebar from '../components/Sidebar.svelte';

    import '../global.scss';

    export let data;

    let { session, version, author } = data;
</script>

<div class="wrapper">
    <Navbar />

    <Sidebar {session} />

    <div class="content-wrapper">
        <slot></slot>
    </div>

    <footer class="main-footer d-flex">
        <div>
            <strong>Made with <i class="fa fa-heart"></i> by <a href={author.url}>{author.name}</a></strong>
        </div>
        <div class="ml-auto">
            <span><b>PxlsAdmin</b> v{version}</span>
        </div>
    </footer>

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->
</div>

<script>
    import Page from '../components/Page.svelte';
</script>

<Page name="Dashboard">
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Title</h3>
    
            <div class="card-tools">
                <button
                    type="button"
                    class="btn btn-tool"
                    data-card-widget="collapse"
                    title="Collapse"
                >
                    <i class="fas fa-minus" />
                </button>
                <button
                    type="button"
                    class="btn btn-tool"
                    data-card-widget="remove"
                    title="Remove"
                >
                    <i class="fas fa-times" />
                </button>
            </div>
        </div>
        <div class="card-body">
            Start creating your amazing application!
        </div>
        <div class="card-footer">Footer</div>
    </div>
</Page>

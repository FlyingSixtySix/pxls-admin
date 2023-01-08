<script>
    import Page from '../../components/Page.svelte';
    import Reports from '../../components/Reports.svelte';

    // export let data;

    // let { canvasReports, chatReports } = data;
</script>

<Page name="Reports">
    <div id="wrapper">
        <Reports type="canvas"></Reports>
        <Reports type="chat"></Reports>
    </div>
</Page>

<style>
#wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>
